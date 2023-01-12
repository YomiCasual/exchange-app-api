import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { MyGateway } from 'src/modules/gateway/gateway';
import { HttpModule } from '@nestjs/axios';
import { ExchangeService } from 'src/modules/exchange/exchange.service';

@Module({
  providers: [TasksService, MyGateway, ExchangeService],
  imports: [HttpModule],
})
export class TaskModule {}
