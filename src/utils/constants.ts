export const APP_MODELS = {
  EXCHANGE: 'Exchange',
};

export const LIVE_EXCHANGES_CRYPTO = ['eth', 'btc', 'xrp'];
export const LIVE_EXCHANGES_FIAT = ['usd', 'eur', 'gbp'];
export const CURRENCY_TO_PICK = [
  ...LIVE_EXCHANGES_CRYPTO,
  ...LIVE_EXCHANGES_FIAT,
];

export enum EXCHANGE_TYPE_ENUM {
  LIVE_PRICE = 'LIVE_PRICE',
  EXCHANGED = 'EXCHANGED',
}
