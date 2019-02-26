import { unlockTokenAsync } from '../common/services/tokenService';
import * as CurrencyCodes from '../common/currencyCodes';

export const LOCK_TOKEN = 'LOCK_TOKEN';
export const LOCK_TOKEN_SUCCESS = 'LOCK_TOKEN_SUCCESS'
export const LOCK_TOKEN_FAIL = 'LOCK_TOKEN_FAIL';


export function lockToken(token) {
    return dispatch => {
        dispatch({
            type: LOCK_TOKEN,
            token
        });


        unlockTokenAsync(token, false)
            .then(() => {
                dispatch({
                    type: LOCK_TOKEN_SUCCESS,
                    token
                });
            })
            .catch(err => {
                dispatch({
                    type: LOCK_TOKEN_FAIL,
                    token
                });
            });
    };
}