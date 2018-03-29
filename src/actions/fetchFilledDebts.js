import debtsApi from '../common/api/debts';
import * as loanStatuses from '../common/loanStatuses';
import {getDefaultAccount} from '../common/services/web3Service';
import {fromDebtOrder} from '../common/services/dharmaService';

export const FETCH_FILLED_DEBTS = 'FETCH_FILLED_DEBTS';
export const FETCH_FILLED_DEBTS_SUCCESS = 'FETCH_FILLED_DEBTS_SUCCESS';
export const FETCH_FILLED_DEBTS_FAIL = 'FETCH_FILLED_DEBTS_FAIL';

const fetchFilledDebtsStart = () => ({
  type: FETCH_FILLED_DEBTS
});

const fetchFilledDebtsSuccess = (debts) => ({
  type: FETCH_FILLED_DEBTS_SUCCESS,
  debts
});

export function fetchFilledDebts(){
  return dispatch => {
    dispatch(fetchFilledDebtsStart());

    let defaultAccount = getDefaultAccount();
    if(defaultAccount){
      return debtsApi.getAll(defaultAccount, loanStatuses.FILLED)
        .then(async(debts) => {
          let mappedDebts = [];
          for(var i=0; i<debts.length; i++){
            mappedDebts.push(await fromDebtOrder(debts[i]));
          }
          dispatch(fetchFilledDebtsSuccess(mappedDebts));
        });
    }

    return
  }
}
