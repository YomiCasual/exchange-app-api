import { IExchange } from 'src/modules/exchange/types';
import { CURRENCY_TO_PICK, EXCHANGE_TYPE_ENUM } from './constants';
import { HttpStatus } from '@nestjs/common';

const replacerFunc = () => {
  const visited = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (visited.has(value)) {
        return;
      }
      visited.add(value);
    }
    return value;
  };
};

export const currencyConverter = ({
  rates = {},
  from = 'btc',
  to = 'usd',
  amountFrom = 1,
}: {
  rates: Record<string, any>;
  from?: string;
  to?: string;
  amountFrom?: number;
}) => {
  // Base conversion is btc

  const converterFrom = rates?.[from?.toLowerCase() || 'btc'];
  const converterTo = rates?.[to?.toLowerCase() || 'usd'];

  const amount =
    (amountFrom * (converterTo?.value || 1)) / (converterFrom?.value || 1);

  return amount?.toFixed(9);
};

export const convertExchangeData = ({
  rates = {},
  to = 'usd',
  stream,
}: {
  rates: Record<string, any>;
} & Partial<IExchange>) => {
  // Base conversion is btc
  const newRates = {};

  for (let i = 0; i < CURRENCY_TO_PICK.length; i++) {
    const curr = CURRENCY_TO_PICK[i];

    if (rates[curr]) {
      newRates[curr] = rates[curr];
    }
  }

  const converterTo = rates[to] ?? rates['usd'];

  for (const key in newRates) {
    const rate = newRates[key];
    newRates[key] = {
      currencyFrom: rate.name,
      amountFrom: 1,
      unitFrom: rate.unit,
      currencyTo: converterTo.name,
      unitTo: converterTo.unit,
      amountTo: currencyConverter({
        rates,
        amountFrom: 1,
        from: key,
        to,
      }),
      type:
        stream === 'true'
          ? EXCHANGE_TYPE_ENUM.LIVE_PRICE
          : EXCHANGE_TYPE_ENUM.EXCHANGED,
    };
  }

  return newRates;
};

export const appResponse = ({
  data,
  message = 'Successful',
  status = HttpStatus.OK,
  metadata = {},
}: {
  data?: any;
  message?: string;
  status?: HttpStatus;
  metadata?: Record<string, any>;
}) => {
  return {
    data,
    message,
    status,
    ...metadata,
  };
};
