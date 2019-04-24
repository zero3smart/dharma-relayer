import { FETCH_MY_OPEN_LOAN_REQUESTS_SUCCESS, SET_MY_OPENED_LOAN_REQUESTS_OFFSET, SHOW_CANCEL_CONFIRMATION, HIDE_CANCEL_CONFIRMATION } from '../actions';

export default function (state = {
  isLoading: true,
  values: [],
  showPaging: false,
  offset: 0,
  totalItemsCount: 0,
  cancelConfirmationVisible: false
}, action) {
  switch (action.type) {
    case FETCH_MY_OPEN_LOAN_REQUESTS_SUCCESS:
      if (state.offset !== action.offset) {   //that prevents situation when old data request resolved after new one
        return state;
      }
      return {
        ...state,
        isLoading: false,
        showPaging: action.debts && (action.debts.length > 0) && (action.debts.length !== action.totalItemsCount),
        totalItemsCount: action.totalItemsCount,
        values: action.debts
      };
    case SET_MY_OPENED_LOAN_REQUESTS_OFFSET:
      return { ...state, offset: action.offset, isLoading: true };
    case SHOW_CANCEL_CONFIRMATION:
      return { ...state, cancelConfirmationVisible: true };
    case HIDE_CANCEL_CONFIRMATION:
      return { ...state, cancelConfirmationVisible: false };
    default:
      return state;
  }
}