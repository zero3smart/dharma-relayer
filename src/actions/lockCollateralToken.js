import { unlockCollateralTokenAsync } from '../common/services/tokenService';
import * as CurrencyCodes from '../common/currencyCodes';

export const LOCK_COLLATERAL_TOKEN = 'LOCK_COLLATERAL_TOKEN';
export const LOCK_COLLATERAL_TOKEN_SUCCESS = 'LOCK_COLLATERAL_TOKEN_SUCCESS';
export const LOCK_COLLATERAL_TOKEN_FAIL = 'LOCK_COLLATERAL_TOKEN_FAIL';


export function lockCollateralToken(token) {
    return dispatch => {
        dispatch({
            type: LOCK_COLLATERAL_TOKEN,
            token
        });


        unlockCollateralTokenAsync(token, true)
            .then(() => {
                dispatch({
                    type: LOCK_COLLATERAL_TOKEN_SUCCESS,
                    token
                });
            })
            .catch(err => {
                dispatch({
                    type: LOCK_COLLATERAL_TOKEN_FAIL,
                    token
                });
            });
    };
}