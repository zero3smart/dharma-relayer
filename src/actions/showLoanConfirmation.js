export const SHOW_LOAN_CONFIRMATION = 'SHOW_LOAN_CONFIRMATION';

export function showLoanConfirmation (debtOrder){
  return {
    type: SHOW_LOAN_CONFIRMATION,
    debtOrder
  };
}