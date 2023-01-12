import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ExchangeDto } from 'src/models/exchange';
import {
  LIVE_EXCHANGES_CRYPTO,
  LIVE_EXCHANGES_FIAT,
} from 'src/utils/constants';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get('/')
  async getAllExhanges() {
    return await this.exchangeService.getAllSavedExchanges();
  }

  @Get('/stream')
  async streamExchangeCurrency(@Query() query) {
    const response = await this.exchangeService.getStreamData({ ...query });
    return { message: 'success', data: response.data };
  }

  @Get('/convert')
  async exchangeCurrency(@Query() query) {
    const response = await this.exchangeService.getExchangeRate({
      ...query,
      stream: 'true',
    });
    return { message: 'success', data: response.data };
  }

  @Get('/exchange-rates')
  async getExchangeRaes() {
    const response = await this.exchangeService.fetchExchangeRates();
    return { message: 'success', data: response.data.rates || {} };
  }

  @Get('/supported-currencies')
  async getSupportedCurrencies() {
    const response = {
      crypto: LIVE_EXCHANGES_CRYPTO,
      fiat: LIVE_EXCHANGES_FIAT,
    };
    return { message: 'success', data: response };
  }
  @Post('/exchange-crypto')
  async exhangeCrypto(@Body() exhangeData: ExchangeDto) {
    return await this.exchangeService.createExchange({
      ...exhangeData,
    });
  }
}
