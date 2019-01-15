import { GET_LOAN_ISSUED_SUCCESS } from '../actions';

export default function (state = [], action) {
    switch(action.type){
        case GET_LOAN_ISSUED_SUCCESS:
            return action.loans
                .map(loan => ({...loan, creationTime: new Date(loan.creationTime)}))
                .sort((a,b) => a.creationTime < b.creationTime ? 1 : (-1))
                .map(loan => ({
                    amount: loan.principalAmount,
                    token: loan.dharmaDebtOrder.principalTokenSymbol,
                    date: loan.creationTime.toLocaleDateString() + " " + loan.creationTime.toLocaleTimeString(),
                    term: loan.dharmaDebtOrder.termLength.toNumber(),
                    interest: loan.dharmaDebtOrder.interestRate.toNumber() + '%'
                }));
        default:
            return state;
    }
}