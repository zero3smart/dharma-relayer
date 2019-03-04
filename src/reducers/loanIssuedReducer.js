import { GET_LOAN_ISSUED_SUCCESS, SET_ISSUED_LOANS_OFFSET } from '../actions';
import { calculateTermInDays } from '../common/services/utilities';

export default function (state = {
    isLoading: true,
    values: [],
    showPaging: false,
    offset: 0,
    totalItemsCount: 0
}, action) {
    switch (action.type) {
        case GET_LOAN_ISSUED_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showPaging: true,
                totalItemsCount: action.totalItemsCount,
                values: action.loans
                    .map(loan => ({ ...loan, issuanceBlockTimeParsed: new Date(loan.issuanceBlockTime) }))
                    .sort((a, b) => a.issuanceBlockTimeParsed < b.issuanceBlockTimeParsed ? 1 : (-1))
                    .map(loan => ({
                        amount: loan.dharmaDebtOrder.principalAmount.toNumber(),
                        token: loan.dharmaDebtOrder.principalTokenSymbol,
                        date: loan.issuanceBlockTimeParsed.toLocaleDateString() + " " + loan.issuanceBlockTimeParsed.toLocaleTimeString(),
                        term: calculateTermInDays(loan.dharmaDebtOrder.amortizationUnit, loan.dharmaDebtOrder.termLength.toNumber()),
                        interest: loan.dharmaDebtOrder.interestRate.toNumber(),
                        issuanceHash: loan.issuanceHash
                    }))
            };
        case SET_ISSUED_LOANS_OFFSET:
            return {
                ...state,
                offset: action.offset,
                isLoading: true
            };
        default:
            return state;
    }
}