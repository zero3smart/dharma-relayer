import { GET_LOAN_REQUESTS, GET_LOAN_REQUESTS_SUCCESS, FILL_LOAN, FILL_LOAN_SUCCESS, FILL_LOAN_FAIL, SET_LOAN_REQUEST_OFFSET } from '../actions';

export default function (state = {
    isLoading: true,
    values: [],
    showPaging: false,
    offset: 0,
    itemsTotalCount: 0
}, action) {
    switch (action.type) {
        case GET_LOAN_REQUESTS_SUCCESS:
            if (state.offset !== action.offset) {   //that prevents situation when old data request resolved after new one
                return state;
            }
            return {
                ...state,
                isLoading: false,
                showPaging: true,
                itemsTotalCount: action.itemsTotalCount,
                values: action.loans.map(loan => {
                    return {
                        ...loan,
                        isLoading: false
                    }
                })
            };
        case SET_LOAN_REQUEST_OFFSET:
            return { ...state, offset: action.offset, isLoading: true };
        case FILL_LOAN:
            return {
                ...state,
                values: state.values.map(loan => ({
                    ...loan,
                    isLoading: loan.id === action.debtOrder.id ? true : loan.isLoading
                }))
            };
        case FILL_LOAN_SUCCESS:
            return {
                ...state,
                values: state.values.map(loan => ({
                    ...loan,
                    isLoading: false
                }))
            };
        case FILL_LOAN_FAIL:
            return {
                ...state,
                values: state.values.map(loan => ({
                    ...loan,
                    isLoading: false
                }))
            };
        default:
            return state;
    }
}