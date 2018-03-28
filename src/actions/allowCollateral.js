import allowCollateralUse from '../common/services/allowCollateralUse';

export const ALLOW_COLLATERAL = 'ALLOW_COLLATERAL';
export const ALLOW_COLLATERAL_SUCCESS = 'ALLOW_COLLATERAL_SUCCESS';
export const ALLOW_COLLATERAL_FAIL = 'ALLOW_COLLATERAL_FAIL';

export function allowCollateral (amount){
  return dispatch => {
    dispatch({
      type: ALLOW_COLLATERAL,
      amount: amount
    });

    return allowCollateralUse(amount)
      .then(() => {
        dispatch({
          type: ALLOW_COLLATERAL_SUCCESS,
          amount: amount
        });
      })
      .catch(err => {
        dispatch({
          type: ALLOW_COLLATERAL_FAIL,
          amount: amount
        });
        Promise.reject(err);
      });
  };
}