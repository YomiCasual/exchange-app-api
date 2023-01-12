import * as mongoose from 'mongoose';
import { APP_MODELS } from 'src/utils/constants';

export const ExchangeSchema = new mongoose.Schema(
  {
    currencyFrom: String,
    amountFrom: String,
    unitFrom: String,
    currencyTo: String,
    unitTo: String,
    amountTo: String,
    type: String,
  },
  { timestamps: true },
);

export const PostModel = mongoose.model(APP_MODELS.EXCHANGE, ExchangeSchema);
