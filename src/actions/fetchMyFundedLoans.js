import debtsApi from '../common/api/debts';
import * as loanStatuses from '../common/loanStatuses';
import { fromDebtOrder } from '../common/services/dharmaService';
import { getDefaultAccount } from '../common/services/web3Service'

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
      .then((debts) => {
        let promises = debts.map(debt => {
          return fromDebtOrder(debt).then(dharmaDebt => {
            if (dharmaDebt) {
              return {
                ...dharmaDebt,
                creationTime: debt.creationTime,
                issuanceBlockTime: debt.issuanceBlockTime,
                issuanceHash: debt.issuanceHash
              };
            }
            return null;
          })
        });

        Promise.all(promises).then(mappedDebts => {
          let filtered = mappedDebts.filter(d => d !== null);
          dispatch(fetchMyFundedLoansSuccess(filtered));
        });
      });
  }
}