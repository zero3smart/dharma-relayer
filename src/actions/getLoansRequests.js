export const GET_LOANS = 'GET_LOANS';
export const GET_LOANS_SUCCESS = 'GET_LOANS_SUCCESS';
export const GET_LOANS_FAIL = 'GET_LOANS_FAIL';

export function getLoansRequests (){
  return dispatch => {
    dispatch({
      type: GET_LOANS
    });

    return getLoans()
      .then(loans => {
        dispatch({
          type: GET_LOANS_SUCCESS,
          loans: loans
        });
      })
      .catch(err => {
        dispatch({
          type: GET_LOANS_FAIL
        });
        Promise.reject(err);
      });
  };
}