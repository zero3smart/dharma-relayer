import { unlockCollateralTokenAsync } from '../common/services/tokenService';
import * as CurrencyCodes from '../common/currencyCodes';

export const UNLOCK_COLLATERAL_TOKEN = 'UNLOCK_COLLATERAL_TOKEN';
export const UNLOCK_COLLATERAL_TOKEN_SUCCESS = 'UNLOCK_COLLATERAL_TOKEN_SUCCESS';
export const UNLOCK_COLLATERAL_TOKEN_FAIL = 'UNLOCK_COLLATERAL_TOKEN_FAIL';


export function unlockCollateralToken(token) {
    return dispatch => {
        dispatch({
            type: UNLOCK_COLLATERAL_TOKEN,
            token
        });


        unlockCollateralTokenAsync(token, true)
            .then(() => {
                dispatch({
                    type: UNLOCK_COLLATERAL_TOKEN_SUCCESS,
                    token
                });
            })
            .catch(err => {
                dispatch({
                    type: UNLOCK_COLLATERAL_TOKEN_FAIL,
                    token
                });
            });
    };
}