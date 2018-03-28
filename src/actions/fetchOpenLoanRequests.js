import debtsApi from '../common/api/debts';
import * as loanStatuses from '../common/loanStatuses';
import web3 from '../common/services/web3Service';
import {fromDebtOrder} from '../common/services/dharmaService';

export const FETCH_OPEN_LOAN_REQUESTS = 'FETCH_OPEN_LOAN_REQUESTS';
export const FETCH_OPEN_LOAN_REQUESTS_SUCCESS = 'FETCH_OPEN_LOAN_REQUESTS_SUCCESS';
export const FETCH_OPEN_LOAN_REQUESTS_FAIL = 'FETCH_OPEN_LOAN_REQUESTS_FAIL';

const fetchOpenLoanRequestsStart = () => ({
  type: FETCH_OPEN_LOAN_REQUESTS
});

const fetchOpenLoanRequestsSuccess = (debts) => ({
    type: FETCH_OPEN_LOAN_REQUESTS_SUCCESS,
    debts
});

export function fetchOpenLoanRequests(){
  return dispatch => {
    dispatch(fetchOpenLoanRequestsStart());

    return debtsApi.getAll(loanStatuses.SIGNED_BY_DEBTOR, web3.eth.defaultAccount)
      .then(async(debts) => {
        let mappedDebts = [];
        for(var i=0; i<debts.length; i++){
          //mappedDebts.push(await fromDebtOrder(debts[i]));
        }
        dispatch(fetchOpenLoanRequestsSuccess(mappedDebts));
      });
  }
}
