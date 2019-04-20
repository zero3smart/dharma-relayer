import { GET_LOAN_ISSUED_SUCCESS, SET_ISSUED_LOANS_OFFSET } from '../actions';

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
				showPaging: action.loans && (action.loans.length > 0) && (action.loans.length !== action.totalItemsCount),
				totalItemsCount: action.totalItemsCount,
				values: action.loans
					.map(loan => ({ ...loan, issuanceBlockTimeParsed: new Date(loan.issuanceBlockTime) }))
					.sort((a, b) => a.issuanceBlockTimeParsed < b.issuanceBlockTimeParsed ? 1 : (-1))
					.map(loan => ({
						amount: loan.dharmaDebtOrder.principalAmount,
						token: loan.dharmaDebtOrder.principalTokenSymbol,
						date: loan.issuanceBlockTimeParsed.toLocaleDateString() + " " + loan.issuanceBlockTimeParsed.toLocaleTimeString(),
						termLength: loan.dharmaDebtOrder.termLength.toNumber(),
						amortizationUnit: loan.dharmaDebtOrder.amortizationUnit,
						interest: loan.dharmaDebtOrder.interestRate,
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