import { GET_LOAN_REQUESTS_SUCCESS } from '../actions';

export default function (state = [], action) {
    switch(action.type){
        case GET_LOAN_REQUESTS_SUCCESS:
            return action.loans.map(loan => ({
                amount: loan.principalAmount,
                date: loan.creationTime || '2018-03-24 17:59:59',
                term: '90 day',
                interest: '10%',
                amortization: '30',
                repayment: '102',
                underwriter: 'N/A',
                score: 'N/A'
            }));
        default:
            return state;
    }
}