import {
    getWalletBalanceAsync as getBalance,
    getDefaultAccount
} from '../common/services/web3Service';

export const GET_WALLET_INFO = 'GET_WALLET_INFO';
export const GET_WALLET_INFO_SUCCESS = 'GET_WALLET_INFO_SUCCESS';
export const GET_WALLET_INFO_FAIL = 'GET_WALLET_INFO_FAIL';

export function getWalletInfo() {
    return dispatch => {
        dispatch({
            type: GET_WALLET_INFO
        });

        return getBalance()
            .then(balance => {
                dispatch({
                    type: GET_WALLET_INFO_SUCCESS,
                    balance: balance,
                    address: getDefaultAccount()
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_WALLET_INFO_FAIL
                });
                return Promise.reject(err);
            });
    };
}