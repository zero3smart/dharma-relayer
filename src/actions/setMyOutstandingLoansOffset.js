
export const SET_MY_OUTSTANDING_LOANS_OFFSET = 'SET_MY_OUTSTANDING_LOANS_OFFSET';

export function setMyOutstandingLoansOffset(offset) {
    return {
        type: SET_MY_OUTSTANDING_LOANS_OFFSET,
        offset
    }
}