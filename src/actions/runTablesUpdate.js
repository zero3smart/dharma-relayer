import {getLoanRequests} from './getLoanRequests';
import {getIssuedLoans} from './getLoanIssued';
import {fetchMyFundedLoans} from './fetchMyFundedLoans';
import {fetchMyOpenedLoanRequests} from './fetchMyOpenedLoanRequests';
import {fetchMyOutstandingLoans} from './fetchMyOutstandingLoans';

export const RUN_TABLES_UPDATE = 'RUN_TABLES_UPDATE';

export function runTablesUpdate (){
  return dispatch => {
    dispatch({type: RUN_TABLES_UPDATE});
    dispatch(getLoanRequests());
    dispatch(getIssuedLoans());
    dispatch(fetchMyFundedLoans());
    dispatch(fetchMyOpenedLoanRequests());
    dispatch(fetchMyOutstandingLoans());
  };
}