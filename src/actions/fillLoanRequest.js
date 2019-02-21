import { fillDebtOrder } from '../common/services/dharmaService';
import * as loanStatuses from '../common/loanStatuses';
import debtsApi from '../common/api/debts';

export const FILL_LOAN = 'FILL_LOAN';
export const FILL_LOAN_SUCCESS = 'FILL_LOAN_SUCCESS';
export const FILL_LOAN_FAIL = 'FILL_LOAN_FAIL';

export function fillLoanRequest(debtOrder, callback) {
    return dispatch => {
        dispatch({
            type: FILL_LOAN,
            debtOrder
        });

        return fillDebtOrder(debtOrder)
            .then(debtOrder => {
                let obj = {
                    status: loanStatuses.FILLED,
                    txHash: debtOrder.txHash
                };
                return debtsApi.put(debtOrder.id, obj);
            })
            .then(res => {
                dispatch({
                    type: FILL_LOAN_SUCCESS
                });
                callback();
            })
            .catch(err => {
                alert(err);
                dispatch({ type: FILL_LOAN_FAIL });
                return Promise.reject(err);
            });
    };
}