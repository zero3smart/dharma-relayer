export const REPAY_LOAN_INIT = "REPAY_LOAN_INIT"
export const REPAY_LOAN_SUCCESS = "REPAY_LOAN_SUCCESS"
export const REPAY_LOAN_FAIL = "REPAY_LOAN_FAIL"

export function repayLoanInit() {
	return dispatch => {
		dispatch({
			type: REPAY_LOAN_INIT,
		})
	}
}

export function repayLoanSuccess(res) {
	return dispatch => {
		dispatch({
			type: REPAY_LOAN_SUCCESS,
			payload: res,
		})
	}
}

export function repayLoanFail(err) {
	return dispatch => {
		dispatch({
			type: REPAY_LOAN_FAIL,
			payload: err,
		})
	}
}