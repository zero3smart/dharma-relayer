import { getTokenLockAsync } from '../common/services/tokenService';
import * as CurrencyCodes from '../common/currencyCodes';

export const GET_TOKEN_LOCK = 'GET_TOKEN_LOCK';
export const GET_TOKEN_LOCK_SUCCESS = 'GET_TOKEN_LOCK_SUCCESS';

export function getTokenLock(token) {
    return dispatch => {
        dispatch({
            type: GET_TOKEN_LOCK,
            token
        });


        getTokenLockAsync(token).then(unlocked => {
            dispatch({
                type: GET_TOKEN_LOCK_SUCCESS,
                token: token,
                unlocked
            });
        });
    };
}