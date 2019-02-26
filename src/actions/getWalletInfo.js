import { getWalletBalanceAsync, getDefaultAccount } from '../common/services/web3Service';
import { getTokenBalanceAsync } from '../common/services/tokenService';

export const GET_WALLET_INFO = 'GET_WALLET_INFO';
export const GET_WALLET_INFO_SUCCESS = 'GET_WALLET_INFO_SUCCESS';
export const GET_WALLET_INFO_FAIL = 'GET_WALLET_INFO_FAIL';

export function getWalletInfo() {
    return (dispatch, getState) => {
        dispatch({
            type: GET_WALLET_INFO
        });

        let currency = getState().walletInfo.selectedCurrency;
        let accountAddress = getDefaultAccount();
        let balancePromise = (currency === 'ETH') ? getWalletBalanceAsync() : getTokenBalanceAsync(currency, accountAddress);

        return balancePromise
            .then(balance => {
                dispatch({
                    type: GET_WALLET_INFO_SUCCESS,
                    balance: balance,
                    address: accountAddress
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