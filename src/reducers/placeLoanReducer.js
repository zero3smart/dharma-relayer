import { PLACE_LOAN, PLACE_LOAN_SUCCESS, PLACE_LOAN_FAIL, HIDE_LOAN_CONFIRMATION } from '../actions';

export default function (state = {
  isLoading: false
}, action) {
  switch(action.type){
    case PLACE_LOAN:
      return { isLoading: true};
    case PLACE_LOAN_SUCCESS:
      return {...state, isLoading: false};
    case PLACE_LOAN_FAIL:
      return {...state, isLoading: false};
    case HIDE_LOAN_CONFIRMATION:
      return {...state, isLoading: false};
    default:
      return state;
  }
}