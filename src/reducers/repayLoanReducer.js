import { REPAY_LOAN_INIT, REPAY_LOAN_SUCCESS, REPAY_LOAN_FAIL } from '../actions';

export default function (state = {
	isLoading: false
}, action) {
	switch (action.type) {
		case REPAY_LOAN_INIT:
			return { isLoading: true };
		case REPAY_LOAN_SUCCESS:
			return { ...state, ...action.payload, isLoading: false };
		case REPAY_LOAN_FAIL:
			return { ...state, ...action.payload, isLoading: false };
		default:
			return state;
	}
}