export const SHOW_FUND_CONFIRMATION = 'SHOW_FUND_CONFIRMATION';

export function showFundConfirmation (loanRequest){
  return {
    type: SHOW_FUND_CONFIRMATION,
    loanRequest
  };
}