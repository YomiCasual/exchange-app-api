import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { appResponse, convertExchangeData } from '../../utils/index';
import { ExchangeDto } from 'src/models/exchange';
import {
  APP_MODELS,
  EXCHANGE_TYPE_ENUM,
  LIVE_EXCHANGES_CRYPTO,
} from 'src/utils/constants';
import { MyGateway } from '../gateway/gateway';
import { IExchange } from './types';

@Injectable()
export class ExchangeService {
  constructor(
    @InjectModel(APP_MODELS.EXCHANGE)
    private readonly exchangeModel: Model<ExchangeDto>,
    private readonly gateway: MyGateway,
  ) {}
  async fetchExchangeRates() {
    return await axios
      .get('https://api.coingecko.com/api/v3/exchange_rates')
      .catch(() => {
        console.error('error');
        throw new ForbiddenException('API not available');
      });
  }

  async getExchangeRate(exchange: Partial<IExchange> = {}) {
    const response = await this.fetchExchangeRates();

    const rates = convertExchangeData({
      rates: response.data.rates,
      ...exchange,
    });

    const isStreamingData = exchange?.stream === 'true';

    const streamRates = {};
    if (isStreamingData) {
      for (let i = 0; i < LIVE_EXCHANGES_CRYPTO.length; i++) {
        const streamCrypto = LIVE_EXCHANGES_CRYPTO[i];

        const stream = rates[streamCrypto];

        if (stream) {
          streamRates[streamCrypto] = stream;
        }
      }
    }

    const ratesTouse = isStreamingData ? streamRates : rates;

    const ratesArray = [];
    for (const rate in ratesTouse) {
      ratesArray.push(ratesTouse[rate]);
    }

    return appResponse({ data: ratesArray });
  }

  async getStreamData(exchange: Partial<IExchange> = {}) {
    const rates = await this.getExchangeRate({ ...exchange, stream: 'true' });
    const newData = await this.exchangeModel.insertMany(rates.data);
    return appResponse({ data: newData });
  }

  async getAllSavedExchanges() {
    const savedExchanges = await this.exchangeModel
      .find()
      .sort('-createdAt')
      .lean();

    return appResponse({
      data: savedExchanges,
    });
  }

  async createExchange(exchange: ExchangeDto) {
    const exchangeModel = new this.exchangeModel({
      ...exchange,
      type: EXCHANGE_TYPE_ENUM.EXCHANGED,
    });
    await exchangeModel.save();

    this.gateway.server.emit('stream_rates', [exchangeModel]);

    return appResponse({
      data: exchange,
    });
  }
}
