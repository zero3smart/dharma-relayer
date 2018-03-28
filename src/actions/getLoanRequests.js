import debtsApi from '../common/api/debts';
import * as loanStatuses from '../common/loanStatuses';
import web3 from '../common/services/web3Service';

export const GET_LOAN_REQUESTS = 'GET_LOANS';
export const GET_LOAN_REQUESTS_SUCCESS = 'GET_LOANS_SUCCESS';
export const GET_LOAN_REQUESTS_FAIL = 'GET_LOANS_FAIL';

const getLoanRequestsStart = () => ({
    type: GET_LOAN_REQUESTS
});

const getLoanRequestsSuccess = (debts) => ({
    type: GET_LOAN_REQUESTS_SUCCESS,
    loans
});

const getLoanRequestsSuccess = (debts) => ({
    type: GET_LOAN_REQUESTS_SUCCESS,
    loans
});

export function getLoanRequests(){
    return dispatch => {
        dispatch(getLoanRequestsStart());

        return debtsApi.getAll(web3.eth.defaultAccount, loanStatuses.SIGNED_BY_DEBTOR)
            .then(loans => {dispatch(getLoanRequestsSuccess(loans))})
            .catch(err => {dispatch()});
    }
}

export function fetchLoanRequests (){
  return dispatch => {
    dispatch({
      type: GET_LOANS
    });

    return getLoans()
      .then(loans => {
        dispatch({
          type: GET_LOANS_SUCCESS,
          loans: loans
        });
      })
      .catch(err => {
        dispatch({
          type: GET_LOANS_FAIL
        });
        Promise.reject(err);
      });
  };
}