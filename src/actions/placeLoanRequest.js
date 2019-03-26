import { createDebtOrder } from '../common/services/dharmaService';
import debtsApi from '../common/api/debts';

export const PLACE_LOAN = 'PLACE_LOAN';
export const PLACE_LOAN_SUCCESS = 'PLACE_LOAN_SUCCESS';
export const PLACE_LOAN_FAIL = 'PLACE_LOAN_FAIL';

export function placeLoanRequest(
  {
    amount,
    currency,
    maxInterest,
    term,
    amortizationUnit,
    collateralType,
    collateralAmount
  }, callback) {
  return dispatch => {
    dispatch({
      type: PLACE_LOAN
    });

    let debtOrderInfo = {
      principalTokenSymbol: currency,
      principalAmount: amount,
      interestRate: maxInterest,
      amortizationUnit: amortizationUnit,
      termLength: term,
      collateralTokenSymbol: collateralType,
      collateralAmount: collateralAmount
    };
    return createDebtOrder(debtOrderInfo)
      .then(debtOrder => debtsApi.post(debtOrder))
      .then(resp => {
        dispatch({
          type: PLACE_LOAN_SUCCESS
        });
        callback();
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: PLACE_LOAN_FAIL
        });
      });
  };
}