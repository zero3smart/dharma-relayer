import {createDebtOrder} from '../common/services/dharmaService';
import debtsApi from '../common/api/debts';
import {RELAYER_AMORTIZATION_FREQUENCIES, DHARMA_AMORTIZATION_UNITS} from '../common/amortizationFrequencies';

export const PLACE_LOAN = 'PLACE_LOAN';
export const PLACE_LOAN_SUCCESS = 'PLACE_LOAN_SUCCESS';
export const PLACE_LOAN_FAIL = 'PLACE_LOAN_FAIL';

export function placeLoanRequest({amount, currency, maxInterest, term, amortizationFrequency}, callback){
  return dispatch => {
    dispatch({
      type: PLACE_LOAN
    });

    let amortizationUnit = DHARMA_AMORTIZATION_UNITS.DAYS;
    term = term * 1;
    if (amortizationFrequency === RELAYER_AMORTIZATION_FREQUENCIES.WEEKLY){
      amortizationUnit = DHARMA_AMORTIZATION_UNITS.WEEKS;
      term = term / 7;
    }
    else if (amortizationFrequency === RELAYER_AMORTIZATION_FREQUENCIES.MONTHLY){
      amortizationUnit = DHARMA_AMORTIZATION_UNITS.MONTHS;
      term = term / 30
    }
    else if (amortizationFrequency === RELAYER_AMORTIZATION_FREQUENCIES.END){
      alert(`${RELAYER_AMORTIZATION_FREQUENCIES.END} is not currently supported`);
      dispatch({
        type:PLACE_LOAN_FAIL
      });
      return;
    }

    let debtOrderInfo = {
      principalTokenSymbol: currency,
      principalAmount: amount,
      interestRate: maxInterest,
      amortizationUnit: amortizationUnit,
      termLength: term
    };

    return createDebtOrder(debtOrderInfo)
      .then(debtOrder => debtsApi.post(debtOrder))
      .then(resp => {
        dispatch({
          type: PLACE_LOAN_SUCCESS
        });
        callback();
        alert('Placed successfully!');
      });
  };
}