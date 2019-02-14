import debtsApi from '../common/api/debts';
import * as loanStatuses from '../common/loanStatuses';
import {
  fromDebtOrder
} from '../common/services/dharmaService';
import {
  getDefaultAccount
} from '../common/services/web3Service'

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

export function fetchMyFundedLoans() {
  return dispatch => {
    dispatch(fetchMyFundedLoansStart());

    return debtsApi.getForCreditor(loanStatuses.FILLED, getDefaultAccount())
      .then(async (debts) => {
        let mappedDebts = [];
        for (var i = 0; i < debts.length; i++) {
          let dharmaDebt = await fromDebtOrder(debts[i]);
          mappedDebts.push({
            ...dharmaDebt,
            creationTime: debts[i].creationTime,
            issuanceBlockTime: debts[i].issuanceBlockTime,
            issuanceHash: debts[i].issuanceHash
          });
        }
        dispatch(fetchMyFundedLoansSuccess(mappedDebts));
      });
  }
}