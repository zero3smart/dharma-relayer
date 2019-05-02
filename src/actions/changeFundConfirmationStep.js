export const CHANGE_FUND_CONFIRMATION_STEP = 'CHANGE_FUND_CONFIRMATION_STEP';

export function changeFundConfirmationStep(step){
  return {
    type: CHANGE_FUND_CONFIRMATION_STEP,
    step
  }
}