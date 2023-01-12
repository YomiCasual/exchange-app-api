import { MyGateway } from 'src/modules/gateway/gateway';
import { ExchangeService } from './exchange.service';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExchangeController } from './exchange.controller';

@Module({
  providers: [ExchangeService, MyGateway],
  imports: [HttpModule],
  controllers: [ExchangeController],
})
export class ExchangeModule {}
