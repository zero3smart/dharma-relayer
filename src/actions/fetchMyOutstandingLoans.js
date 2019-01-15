import debtsApi from '../common/api/debts';
import * as loanStatuses from '../common/loanStatuses';
import {getDefaultAccount} from '../common/services/web3Service';
import {fromDebtOrder} from '../common/services/dharmaService';

export const FETCH_MY_OUTSTANDING_LOANS = 'FETCH_MY_OUTSTANDING_LOANS';
export const FETCH_MY_OUTSTANDING_LOANS_SUCCESS = 'FETCH_MY_OUTSTANDING_LOANS_SUCCESS';
export const FETCH_MY_OUTSTANDING_LOANS_FAIL = 'FETCH_MY_OUTSTANDING_LOANS_FAIL';

const fetchMyOutstandingLoansStart = () => ({
  type: FETCH_MY_OUTSTANDING_LOANS
});

const fetchMyOutstandingLoansSuccess = (debts) => ({
  type: FETCH_MY_OUTSTANDING_LOANS_SUCCESS,
  debts
});

export function fetchMyOutstandingLoans(){
  return dispatch => {
    dispatch(fetchMyOutstandingLoansStart());

    let defaultAccount = getDefaultAccount();
    if(defaultAccount){
      return debtsApi.getForDebtor(loanStatuses.FILLED, defaultAccount)
        .then(async(debts) => {
          let mappedDebts = [];
          for(var i=0; i<debts.length; i++){
            let dharmaDebt = await fromDebtOrder(debts[i]);
            mappedDebts.push({...dharmaDebt, creationTime: debts[i].creationTime});
          }
          dispatch(fetchMyOutstandingLoansSuccess(mappedDebts));
        });
    }

    return
  }
}