import { GET_LOAN_REQUESTS_SUCCESS, FILL_LOAN } from '../actions';

export default function (state = [], action) {
    switch(action.type){
        case GET_LOAN_REQUESTS_SUCCESS:
            return action.loans.map(loan => {
                return {
                    ...loan,
                    isProcessing: false
                }
            });
        case FILL_LOAN:
            return state.map(loan => ({
                ...loan,
                isProcessing: loan.id === action.debtOrder.id ? true : loan.isProcessing
            }));
        default:
            return state;
    }
}