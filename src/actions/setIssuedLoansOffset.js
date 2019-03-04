export const SET_ISSUED_LOANS_OFFSET = 'SET_ISSUED_LOANS_OFFSET';

export function setIssuedLoansOffset(offset) {
    return {
        type: SET_ISSUED_LOANS_OFFSET,
        offset
    }
}