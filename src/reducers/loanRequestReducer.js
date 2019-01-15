import { GET_LOAN_REQUESTS_SUCCESS, FILL_LOAN, FILL_LOAN_SUCCESS, FILL_LOAN_FAIL } from '../actions';

export default function (state = [], action) {
    switch(action.type){
        case GET_LOAN_REQUESTS_SUCCESS:
            return action.loans.map(loan => {
                return {
                    ...loan,
                    isLoading: false
                }
            });
        case FILL_LOAN:
            return state.map(loan => ({
                ...loan,
                isLoading: loan.id === action.debtOrder.id ? true : loan.isLoading
            }));
        case FILL_LOAN_SUCCESS:
            return state.map(loan => ({
                ...loan,
                isLoading: false
            }));
        case FILL_LOAN_FAIL:
            return state.map(loan => ({
                ...loan,
                isLoading: false
            }));
        default:
            return state;
    }
}