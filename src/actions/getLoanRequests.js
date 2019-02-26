import debtsApi from '../common/api/debts';
import * as loanStatuses from '../common/loanStatuses';
import { fromDebtOrder } from '../common/services/dharmaService';

export const GET_LOAN_REQUESTS = 'GET_LOAN_REQUESTS';
export const GET_LOAN_REQUESTS_SUCCESS = 'GET_LOAN_REQUESTS_SUCCESS';
export const GET_LOAN_REQUESTS_FAIL = 'GET_LOAN_REQUESTS_FAIL';

const getLoanRequestsStart = () => ({
    type: GET_LOAN_REQUESTS
});

const getLoanRequestsSuccess = (loans) => ({
    type: GET_LOAN_REQUESTS_SUCCESS,
    loans
});

const getLoanRequestsFail = (error) => ({
    type: GET_LOAN_REQUESTS_FAIL,
    error
});

export function getLoanRequests() {
    return dispatch => {
        dispatch(getLoanRequestsStart());

        return debtsApi.getAll(loanStatuses.SIGNED_BY_DEBTOR)
            .then((debts) => {

                let promises = debts.map(debt => {
                    return fromDebtOrder(debt).then(debtOrder => {
                        if (debtOrder) {
                            return { ...debt, dharmaDebtOrder: debtOrder };
                        }
                        return null;
                    })
                });

                Promise.all(promises).then(mappedDebts => {
                    let filtered = mappedDebts.filter(d => d !== null);
                    dispatch(getLoanRequestsSuccess(filtered));
                });

            })
            .catch(err => { dispatch(getLoanRequestsFail(err)) });
    }
}