import {getPrincipalTokenLockAsync} from '../common/services/tokenService';

export const GET_COLLATERAL_TOKEN_LOCK = 'GET_COLLATERAL_TOKEN_LOCK';
export const GET_COLLATERAL_TOKEN_LOCK_SUCCESS = 'GET_COLLATERAL_TOKEN_LOCK_SUCCESS';

export function getCollateralTokenLock (token){
  return dispatch => {
    dispatch({
      type: GET_COLLATERAL_TOKEN_LOCK,
      token
    });

    getPrincipalTokenLockAsync(token).then(unlocked => {
      dispatch({
        type: GET_COLLATERAL_TOKEN_LOCK_SUCCESS,
        token:token,
        unlocked
      });
    });
  };
}