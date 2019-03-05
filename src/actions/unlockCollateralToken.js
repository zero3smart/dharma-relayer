import { unlockCollateralTokenAsync } from '../common/services/tokenService';

export const UNLOCK_COLLATERAL_TOKEN = 'UNLOCK_COLLATERAL_TOKEN';
export const UNLOCK_COLLATERAL_TOKEN_SUCCESS = 'UNLOCK_COLLATERAL_TOKEN_SUCCESS';
export const UNLOCK_COLLATERAL_TOKEN_FAIL = 'UNLOCK_COLLATERAL_TOKEN_FAIL';


export function unlockCollateralToken(token, amount) {
    return dispatch => {
        dispatch({
            type: UNLOCK_COLLATERAL_TOKEN,
            token
        });


        unlockCollateralTokenAsync(token, amount, true)
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