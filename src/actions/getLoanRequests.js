import debtsApi from '../common/api/debts';
import * as loanStatuses from '../common/loanStatuses';
import {convertFromRelayerFormat} from '../common/services/dharmaService';

export const GET_LOAN_REQUESTS = 'GET_LOAN_REQUESTS';
export const GET_LOAN_REQUESTS_SUCCESS = 'GET_LOAN_REQUESTS_SUCCESS';
export const GET_LOAN_REQUESTS_FAIL = 'GET_LOAN_REQUESTS_FAIL';

const getLoanRequestsStart = () => ({
    type: GET_LOAN_REQUESTS
});

const getLoanRequestsSuccess = (loans, offset, totalItemsCount) => ({
    type: GET_LOAN_REQUESTS_SUCCESS,
    loans,
    offset,
    totalItemsCount
});

const getLoanRequestsFail = (error) => ({
    type: GET_LOAN_REQUESTS_FAIL,
    error
});

export function getLoanRequests(offset, limit){
    return (dispatch)=> {
        dispatch(getLoanRequestsStart());

        return debtsApi.getAll(loanStatuses.SIGNED_BY_DEBTOR, offset, limit)
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
                  dispatch(getLoanRequestsSuccess(filtered, offset, totalItemsCount));
                });

            })
            .catch(err => {dispatch(getLoanRequestsFail(err))});
    }
}