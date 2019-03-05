
export const SET_MY_FUNDED_LOANS_OFFSET = 'SET_MY_FUNDED_LOANS_OFFSET';

export function setMyFundedLoansOffset(offset) {
    return {
        type: SET_MY_FUNDED_LOANS_OFFSET,
        offset
    }
}