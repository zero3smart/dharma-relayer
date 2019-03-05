import debtsApi from '../common/api/debts';
import * as loanStatuses from '../common/loanStatuses';
import { getDefaultAccount } from '../common/services/web3Service';
import { fromDebtOrder } from '../common/services/dharmaService';

export const FETCH_MY_OPEN_LOAN_REQUESTS = 'FETCH_MY_OPEN_LOAN_REQUESTS';
export const FETCH_MY_OPEN_LOAN_REQUESTS_SUCCESS = 'FETCH_MY_OPEN_LOAN_REQUESTS_SUCCESS';
export const FETCH_MY_OPEN_LOAN_REQUESTS_FAIL = 'FETCH_MY_OPEN_LOAN_REQUESTS_FAIL';

const fetchMyOpenedLoanRequestsStart = () => ({
    type: FETCH_MY_OPEN_LOAN_REQUESTS
});

const fetchMyOpenedLoanRequestsSuccess = (debts, offset, totalItemsCount) => ({
    type: FETCH_MY_OPEN_LOAN_REQUESTS_SUCCESS,
    debts,
    offset,
    totalItemsCount
});

export function fetchMyOpenedLoanRequests(offset, limit) {
    return dispatch => {
        dispatch(fetchMyOpenedLoanRequestsStart());

        return debtsApi.getForDebtor(loanStatuses.SIGNED_BY_DEBTOR, getDefaultAccount(), offset, limit)
            .then((response) => {
                let { items: debts, totalItemsCount } = response;
                let promises = debts.map(debt => {
                    return fromDebtOrder(debt).then(dharmaDebt => {
                        if (dharmaDebt) {
                            return {
                                ...dharmaDebt,
                                creationTime: debt.creationTime
                            };
                        }
                        return null;
                    })
                });

                Promise.all(promises).then(mappedDebts => {
                    let filtered = mappedDebts.filter(d => d !== null);
                    dispatch(fetchMyOpenedLoanRequestsSuccess(filtered, offset, totalItemsCount));
                });
            });
    }
}