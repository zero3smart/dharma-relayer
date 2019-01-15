import debtsApi from '../common/api/debts';
import * as loanStatuses from '../common/loanStatuses';
import web3 from '../common/services/web3Service';
import {fromDebtOrder} from '../common/services/dharmaService';

export const FETCH_MY_FUNDED_LOANS = 'FETCH_MY_FUNDED_LOANS';
export const FETCH_MY_FUNDED_LOANS_SUCCESS = 'FETCH_MY_FUNDED_LOANS_SUCCESS';
export const FETCH_MY_FUNDED_LOANS_FAIL = 'FETCH_MY_FUNDED_LOANS_FAIL';

const fetchMyFundedLoansStart = () => ({
  type: FETCH_MY_FUNDED_LOANS
});

const fetchMyFundedLoansSuccess = (debts) => ({
  type: FETCH_MY_FUNDED_LOANS_SUCCESS,
  debts
});

export function fetchMyFundedLoans(){
  return dispatch => {
    dispatch(fetchMyFundedLoansStart());

    return debtsApi.getForCreditor(loanStatuses.FILLED, web3.eth.defaultAccount)
      .then(async(debts) => {
        let mappedDebts = [];
        for(var i=0; i<debts.length; i++){
          let dharmaDebt = await fromDebtOrder(debts[i]);
          mappedDebts.push({...dharmaDebt, creationTime: debts[i].creationTime});
        }
        dispatch(fetchMyFundedLoansSuccess(mappedDebts));
      });
  }
}