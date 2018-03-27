export const PLACE_LOAN = 'PLACE_LOAN';
export const PLACE_LOAN_SUCCESS = 'PLACE_LOAN_SUCCESS';
export const PLACE_LOAN_FAIL = 'PLACE_LOAN_FAIL';

export function placeLoanRequest({amount, currency}){
  return dispatch => {
    dispatch({
      type: PLACE_LOAN
    });

    //return placeLoanRequest(spender, amount)
    //  .then(() => {
    //    dispatch({
    //      type: PLACE_LOAN_SUCCESS
    //    });
    //  })
    //  .catch(err => {
    //    dispatch({
    //      type: PLACE_LOAN_FAIL
    //    });
    //    Promise.reject(err);
    //  });
  };
}