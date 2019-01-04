import {fillDebtOrder} from '../common/services/dharmaService';
import * as loanStatuses from '../common/loanStatuses';
import debtsApi from '../common/api/debts';

export const FILL_LOAN = 'FILL_LOAN';
export const FILL_LOAN_SUCCESS = 'FILL_LOAN_SUCCESS';
export const FILL_LOAN_FAIL = 'FILL_LOAN_FAIL';

export function fillLoanRequest(debtOrder) {
    return dispatch => {
        dispatch({
            type: FILL_LOAN,
            debtOrder
        });

        return fillDebtOrder(debtOrder)
            .then(debtOrder => {
                let obj = {
                    status: loanStatuses.FILLED,
                    creditorAddress: debtOrder.dharmaDebtOrder.creditor,
                    txHash: debtOrder.txHash
                };
                debtsApi.put(debtOrder.id, obj);
            })
            .then(res => {
                dispatch({
                    type: FILL_LOAN_SUCCESS
                });
            });
    };
}