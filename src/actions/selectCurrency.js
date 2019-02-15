import {
  getTokenBalance
} from '../common/services/tokenService';
import * as CurrencyCodes from '../common/currencyCodes';
import {
  getWalletBalanceAsync,
  getDefaultAccount
} from '../common/services/web3Service';

export const SELECT_CURRENCY = 'SELECT_CURRENCY';
export const SELECT_CURRENCY_SUCCESS = 'SELECT_CURRENCY_SUCCESS';

export function selectCurrency(currency) {
  return dispatch => {
    dispatch({
      type: SELECT_CURRENCY,
      currency
    });

    let accountAddress = getDefaultAccount();
    let balancePromise = (currency === CurrencyCodes.ETH) ? getWalletBalanceAsync() : getTokenBalance(currency, accountAddress);

    balancePromise.then((balance) => {
      dispatch({
        type: SELECT_CURRENCY_SUCCESS,
        currency,
        balance
      });
    });
  };
}