import { unlockTokenAsync } from '../common/services/tokenService';
import * as CurrencyCodes from '../common/currencyCodes';

export const UNLOCK_TOKEN = 'UNLOCK_TOKEN';
export const UNLOCK_TOKEN_SUCCESS = 'UNLOCK_TOKEN_SUCCESS';

export function unlockToken(token) {
    return dispatch => {
        dispatch({
            type: UNLOCK_TOKEN,
            token
        });


        unlockTokenAsync(token, true).then(() => {
            dispatch({
                type: UNLOCK_TOKEN_SUCCESS,
                token
            });
        });
    };
}