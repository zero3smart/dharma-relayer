import { REPAY_LOAN_INIT, REPAY_LOAN_SUCCESS, REPAY_LOAN_FAIL } from '../actions';

export default function (state = {
	isLoading: false, complete: false
}, action) {
	switch (action.type) {
		case REPAY_LOAN_INIT:
			return { isLoading: true, complete: false };
		case REPAY_LOAN_SUCCESS:
			return { ...state, ...action.payload, isLoading: false, complete: true };
		case REPAY_LOAN_FAIL:
			return { ...state, ...action.payload, isLoading: false, complete: false };
		default:
			return state;
	}
}