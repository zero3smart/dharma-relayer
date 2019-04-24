import { cancelDebtOrder } from '../common/services/dharmaService';

export const CANCEL_LOAN = 'CANCEL_LOAN';
export const CANCEL_LOAN_SUCCESS = 'CANCEL_LOAN_SUCCESS';
export const CANCEL_LOAN_FAIL = 'CANCEL_LOAN_FAIL';

export function cancelLoanRequest(issuanceHash, callback) {
    return dispatch => {
        dispatch({
            type: CANCEL_LOAN
        });

        return cancelDebtOrder(issuanceHash)
            .then(() => {
                //todo: api call
            })
            .then(resp => {
                dispatch({
                    type: CANCEL_LOAN_SUCCESS
                });
                if (callback) {
                    callback();
                }
            })
            .catch(err => {
                console.error(err);
                dispatch({
                    type: CANCEL_LOAN_FAIL
                });
            });
    };
}