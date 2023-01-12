import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ExchangeService } from 'src/modules/exchange/exchange.service';
import { MyGateway } from 'src/modules/gateway/gateway';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly gateway: MyGateway,
    private readonly exchangeService: ExchangeService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    const response = await this.exchangeService.getStreamData();

    this.logger.debug('Cron job called');

    this.gateway.server.emit('stream_rates', response.data);
  }
}
