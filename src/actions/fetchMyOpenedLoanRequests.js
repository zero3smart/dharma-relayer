import debtsApi from '../common/api/debts';
import * as loanStatuses from '../common/loanStatuses';
import {
    getDefaultAccount
} from '../common/services/web3Service';
import {
    fromDebtOrder
} from '../common/services/dharmaService';

export const FETCH_MY_OPEN_LOAN_REQUESTS = 'FETCH_MY_OPEN_LOAN_REQUESTS';
export const FETCH_MY_OPEN_LOAN_REQUESTS_SUCCESS = 'FETCH_MY_OPEN_LOAN_REQUESTS_SUCCESS';
export const FETCH_MY_OPEN_LOAN_REQUESTS_FAIL = 'FETCH_MY_OPEN_LOAN_REQUESTS_FAIL';

const fetchMyOpenedLoanRequestsStart = () => ({
    type: FETCH_MY_OPEN_LOAN_REQUESTS
});

const fetchMyOpenedLoanRequestsSuccess = (debts) => ({
    type: FETCH_MY_OPEN_LOAN_REQUESTS_SUCCESS,
    debts
});

export function fetchMyOpenedLoanRequests() {
    return dispatch => {
        dispatch(fetchMyOpenedLoanRequestsStart());

        return debtsApi.getForDebtor(loanStatuses.SIGNED_BY_DEBTOR, getDefaultAccount())
            .then(async (debts) => {
                let mappedDebts = [];
                for (var i = 0; i < debts.length; i++) {
                    let dharmaDebt = await fromDebtOrder(debts[i]);
                    if (dharmaDebt)
                        mappedDebts.push({
                            ...dharmaDebt,
                            creationTime: debts[i].creationTime
                        });
                }
                dispatch(fetchMyOpenedLoanRequestsSuccess(mappedDebts));
            });
    }
}