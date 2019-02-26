export const CHANGE_DEBT_ORDER_CONFIRMATION_STEP = 'CHANGE_DEBT_ORDER_CONFIRMATION_STEP'

export function changeDebtOrderConfirmationStep(step) {
    return {
        type: CHANGE_DEBT_ORDER_CONFIRMATION_STEP,
        step
    }
}