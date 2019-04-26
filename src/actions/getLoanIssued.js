import debtsApi from '../common/api/debts';
import * as loanStatuses from '../common/loanStatuses';
import {convertFromRelayerFormat} from '../common/services/dharmaService';

export const GET_LOAN_ISSUED = 'GET_LOAN_ISSUED';
export const GET_LOAN_ISSUED_SUCCESS = 'GET_LOAN_ISSUED_SUCCESS';
export const GET_LOAN_ISSUED_FAIL = 'GET_LOAN_ISSUED_FAIL';

const getIssuedLoansStart = () => ({
    type: GET_LOAN_ISSUED
});

const getIssuedLoansSuccess = (loans, offset, totalItemsCount) => ({
    type: GET_LOAN_ISSUED_SUCCESS,
    loans,
    offset,
    totalItemsCount
});

const getIssuedLoansFail = (error) => ({
    type: GET_LOAN_ISSUED_FAIL,
    error
});

export function getIssuedLoans(offset, limit){
    return dispatch => {
        dispatch(getIssuedLoansStart());

        return debtsApi.getAll(loanStatuses.FILLED, offset, limit)
            .then((resp) => {
                let {items:debts, totalItemsCount} = resp;

                let promises = debts.map(debt => {
                    return convertFromRelayerFormat(debt).then(debtOrder => {
                        if(debtOrder){
                            return {...debt, dharmaDebtOrder:debtOrder};
                        }
                        return null;
                    })
                });

                Promise.all(promises).then(mappedDebts => {
                    let filtered = mappedDebts.filter(d => d !== null);
                    dispatch(getIssuedLoansSuccess(filtered, offset, totalItemsCount));
                });
            })
            .catch(err => {dispatch(getIssuedLoansFail(err))});
    }
}