import {
    GET_LOAN_ISSUED_SUCCESS
} from '../actions';

export default function (state = [], action) {
    switch (action.type) {
        case GET_LOAN_ISSUED_SUCCESS:
            return action.loans
                .map(loan => ({
                    ...loan,
                    issuanceBlockTimeParsed: new Date(loan.issuanceBlockTime)
                }))
                .sort((a, b) => a.issuanceBlockTimeParsed < b.issuanceBlockTimeParsed ? 1 : (-1))
                .map(loan => ({
                    amount: loan.principalAmount,
                    token: loan.dharmaDebtOrder.principalTokenSymbol,
                    date: loan.issuanceBlockTimeParsed.toLocaleDateString() + " " + loan.issuanceBlockTimeParsed.toLocaleTimeString(),
                    term: loan.dharmaDebtOrder.termLength.toNumber(),
                    interest: loan.dharmaDebtOrder.interestRate.toNumber() + '%'
                }));
        default:
            return state;
    }
}