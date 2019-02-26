import debtsApi from '../common/api/debts';
import * as loanStatuses from '../common/loanStatuses';
import { fromDebtOrder } from '../common/services/dharmaService';

export const GET_LOAN_ISSUED = 'GET_LOAN_ISSUED';
export const GET_LOAN_ISSUED_SUCCESS = 'GET_LOAN_ISSUED_SUCCESS';
export const GET_LOAN_ISSUED_FAIL = 'GET_LOAN_ISSUED_FAIL';

const getIssuedLoansStart = () => ({
    type: GET_LOAN_ISSUED
});

const getIssuedLoansSuccess = (loans) => ({
    type: GET_LOAN_ISSUED_SUCCESS,
    loans
});

const getIssuedLoansFail = (error) => ({
    type: GET_LOAN_ISSUED_FAIL,
    error
});

export function getIssuedLoans() {
    return dispatch => {
        dispatch(getIssuedLoansStart());

        return debtsApi.getAll(loanStatuses.FILLED)
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
                    dispatch(getIssuedLoansSuccess(filtered));
                });
            })
            .catch(err => { dispatch(getIssuedLoansFail(err)) });
    }
}