import debtsApi from '../common/api/debts';
import * as loanStatuses from '../common/loanStatuses';
import web3 from '../common/services/web3Service';
import {fromDebtOrder} from '../common/services/dharmaService';

export const FETCH_SIGNED_BY_DEBTOR = 'FETCH_SIGNED_BY_DEBTOR';
export const FETCH_SIGNED_BY_DEBTOR_SUCCESS = 'FETCH_SIGNED_BY_DEBTOR_SUCCESS';
export const FETCH_SIGNED_BY_DEBTOR_FAIL = 'FETCH_SIGNED_BY_DEBTOR_FAIL';

const fetchSignedByDebtorStart = () => ({
  type: FETCH_SIGNED_BY_DEBTOR
});

const fetchSignedByDebtorSuccess = (debts) => ({
    type: FETCH_SIGNED_BY_DEBTOR_SUCCESS,
    debts
});

export function fetchSignedByDebtor(){
  return dispatch => {
    dispatch(fetchSignedByDebtorStart());

    return debtsApi.getAll(loanStatuses.SIGNED_BY_DEBTOR, web3.eth.defaultAccount)
      .then(async(debts) => {
        let mappedDebts = [];
        for(var i=0; i<debts.length; i++){
          let dharmaDebt = await fromDebtOrder(debts[i]);
          mappedDebts.push({...dharmaDebt, creationTime: debts[i].creationTime});
        }
        dispatch(fetchSignedByDebtorSuccess(mappedDebts));
      });
  }
}