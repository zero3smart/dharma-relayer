export const SELECT_CURRENCY = 'SELECT_CURRENCY';

export function selectCurrency (currency){
  return {
    type: SELECT_CURRENCY,
    currency: currency
  }
}