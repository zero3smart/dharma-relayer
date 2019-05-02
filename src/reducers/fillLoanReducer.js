import { FILL_LOAN, FILL_LOAN_SUCCESS, FILL_LOAN_FAIL } from '../actions';

export default function (state = {
  isLoading: false
}, action) {
  switch(action.type){
    case FILL_LOAN:
      return { isLoading: true};
    case FILL_LOAN_SUCCESS:
      return {...state, isLoading: false};
    case FILL_LOAN_FAIL:
      return {...state, isLoading: false};
    default:
      return state;
  }
}