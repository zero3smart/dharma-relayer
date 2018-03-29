import { GET_LOAN_ISSUED_SUCCESS } from '../actions';

export default function (state = [], action) {
    switch(action.type){
        case GET_LOAN_ISSUED_SUCCESS:
            return action.loans.map(loan => {
                const date = new Date(loan.creationTime);
                return {
                    amount: loan.principalAmount,
                    token: loan.dharmaDebtOrder.principalTokenSymbol,
                    date: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
                    term: loan.dharmaDebtOrder.termLength.toNumber(),
                    interest: loan.dharmaDebtOrder.interestRate.toNumber() + '%'
                }
            });
        default:
            return state;
    }
}