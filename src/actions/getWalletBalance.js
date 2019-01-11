import {getWalletBalance as getBalance} from '../common/services/web3Service';

export const GET_WALLET_BALANCE = 'GET_WALLET_BALANCE';
export const GET_WALLET_BALANCE_SUCCESS = 'GET_WALLET_BALANCE_SUCCESS';
export const GET_WALLET_BALANCE_FAIL = 'GET_WALLET_BALANCE_FAIL';

export function getWalletBalance (){
  return dispatch => {
    dispatch({
      type: GET_WALLET_BALANCE
    });

    return getBalance()
      .then(balance => {
        dispatch({
          type: GET_WALLET_BALANCE_SUCCESS,
          balance: balance
        });
      })
      .catch(err => {
        dispatch({
          type: GET_WALLET_BALANCE_FAIL
        });
        return Promise.reject(err);
      });
  };
}