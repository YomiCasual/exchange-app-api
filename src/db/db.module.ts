import { Global, Module } from '@nestjs/common';
import { ExchangeSchema } from './../models/exchange/exchange.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_MODELS } from 'src/utils/constants';

const SCHEMAS = [
  MongooseModule.forFeature([
    { name: APP_MODELS.EXCHANGE, schema: ExchangeSchema },
  ]),
];

@Global()
@Module({
  imports: [...SCHEMAS],
  exports: [...SCHEMAS],
  providers: [],
})
export class DbModule {}
