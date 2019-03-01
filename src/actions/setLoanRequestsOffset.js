
export const SET_LOAN_REQUEST_OFFSET = 'SET_LOAN_REQUEST_OFFSET';

export function setLoanRequestsOffset(offset) {
    return {
        type: SET_LOAN_REQUEST_OFFSET,
        offset
    }
}