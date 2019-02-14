import {
    getLoanRequests
} from './getLoanRequests';
import {
    getIssuedLoans
} from './getLoanIssued';
import {
    fetchMyFundedLoans
} from './fetchMyFundedLoans';
import {
    fetchMyOpenedLoanRequests
} from './fetchMyOpenedLoanRequests';
import {
    fetchMyOutstandingLoans
} from './fetchMyOutstandingLoans';
import {
    getWalletInfo
} from './getWalletInfo';


export const RUN_GLOBAL_UPDATE = 'RUN_GLOBAL_UPDATE';

export function runGlobalUpdate() {
    return dispatch => {
        dispatch({
            type: RUN_GLOBAL_UPDATE
        });
        dispatch(getWalletInfo());
        dispatch(getLoanRequests());
        dispatch(getIssuedLoans());
        dispatch(fetchMyFundedLoans());
        dispatch(fetchMyOpenedLoanRequests());
        dispatch(fetchMyOutstandingLoans());
    };
}