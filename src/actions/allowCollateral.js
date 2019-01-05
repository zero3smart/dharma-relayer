import allowCollateralUse from '../common/services/allowCollateralUse';

export const ALLOW_COLLATERAL = 'ALLOW_COLLATERAL';
export const ALLOW_COLLATERAL_SUCCESS = 'ALLOW_COLLATERAL_SUCCESS';
export const ALLOW_COLLATERAL_FAIL = 'ALLOW_COLLATERAL_FAIL';

export function allowCollateral (debtOrder){
  return dispatch => {
    dispatch({
      type: ALLOW_COLLATERAL,
      debtOrder
    });

    return allowCollateralUse(debtOrder.collateralAmount, debtOrder.collateralType)
      .then(() => {
        dispatch({
          type: ALLOW_COLLATERAL_SUCCESS,
          debtOrder
        });
      })
      .catch(err => {
        dispatch({
          type: ALLOW_COLLATERAL_FAIL,
          debtOrder
        });
        Promise.reject(err);
      });
  };
}