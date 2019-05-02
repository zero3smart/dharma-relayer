import { getTokenLock } from '../actions';

export const SHOW_FUND_CONFIRMATION = 'SHOW_FUND_CONFIRMATION';

export function showFundConfirmation (loanRequest){
  return dispatch => {
    dispatch(getTokenLock(loanRequest.dharmaDebtOrder.principalTokenSymbol));

    dispatch({
      type: SHOW_FUND_CONFIRMATION,
      loanRequest
    });
  };
}