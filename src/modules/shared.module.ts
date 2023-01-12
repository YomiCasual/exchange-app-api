import { Module } from '@nestjs/common';
import { TaskModule } from 'src/cron/task.module';
import { ExchangeModule } from './exchange/exhange.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [GatewayModule, TaskModule, ExchangeModule],
  controllers: [],
  providers: [],
})
export class SharedModule {}
