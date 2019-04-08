import { getDefaultAccount } from '../common/services/web3Service';
import { getTokenBalanceAsync } from '../common/services/tokenService';

export const GET_TOKEN_BALANCE = 'GET_TOKEN_BALANCE';
export const GET_TOKEN_BALANCE_SUCCESS = 'GET_TOKEN_BALANCE_SUCCESS';
export const GET_TOKEN_BALANCE_FAIL = 'GET_TOKEN_BALANCE_FAIL';

export function getTokenBalance(token) {
    return dispatch => {
        dispatch({
            type: GET_TOKEN_BALANCE
        });

        return getTokenBalanceAsync(token, getDefaultAccount())
            .then(balance => {
                dispatch({
                    type: GET_TOKEN_BALANCE_SUCCESS,
                    token: token,
                    amount: balance
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_TOKEN_BALANCE_FAIL
                });
                return Promise.reject(err);
            });
    }
}