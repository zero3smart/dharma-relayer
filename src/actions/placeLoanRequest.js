import {createDebtOrder} from '../common/services/dharmaService';
import debtsApi from '../common/api/debts';

export const PLACE_LOAN = 'PLACE_LOAN';
export const PLACE_LOAN_SUCCESS = 'PLACE_LOAN_SUCCESS';
export const PLACE_LOAN_FAIL = 'PLACE_LOAN_FAIL';

export function placeLoanRequest({amount, currency, maxInterest, term}, callback){
  return dispatch => {
    dispatch({
      type: PLACE_LOAN
    });

    //let debtOrderInfo = {
    //  principalTokenSymbol: 'DAI',
    //  principalAmount: 22,
    //  interestRate: 2.5,
    //  amortizationUnit: 'weeks',
    //  termLength: 11
    //};
    let debtOrderInfo = {
      principalTokenSymbol: currency,
      principalAmount: amount,
      interestRate: maxInterest,
      amortizationUnit: 'weeks', //todo: set correct value here
      termLength: term
    };
    return createDebtOrder(debtOrderInfo)
      .then(debtOrder => debtsApi.post(debtOrder))
      .then(resp => {
        alert('Placed successfully!');
        callback();
        dispatch({
          type: PLACE_LOAN_SUCCESS
        });
      });
  };
}