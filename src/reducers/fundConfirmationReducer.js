import {
  SHOW_FUND_CONFIRMATION,
  HIDE_FUND_CONFIRMATION,
  CHANGE_FUND_CONFIRMATION_STEP,
  UNLOCK_TOKEN_SUCCESS,
  LOCK_TOKEN_SUCCESS,
  UNLOCK_TOKEN_FAIL,
  LOCK_TOKEN_FAIL,
  UNLOCK_TOKEN,
  LOCK_TOKEN,
  GET_TOKEN_LOCK,
  GET_TOKEN_LOCK_SUCCESS,
  // FILL_LOAN_SUCCESS
} from '../actions';

const initialState = {
  modalVisible: false,
  stepNumber: 1,
  lendTokenUnlocked: false,
  unlockInProgress: false
};

export default function (state = initialState, action) {
  switch(action.type){
    case SHOW_FUND_CONFIRMATION:
      return { ...state, modalVisible: true, stepNumber: 1, lendTokenUnlocked: false, unlockInProgress: false, loanRequest: action.loanRequest };
    case HIDE_FUND_CONFIRMATION:
      return {...state, modalVisible: false};
    case CHANGE_FUND_CONFIRMATION_STEP:
      return {...state, stepNumber: action.step};
    case UNLOCK_TOKEN_SUCCESS:
      return {...state, lendTokenUnlocked: true, unlockInProgress: false};
    case LOCK_TOKEN_SUCCESS:
      return {...state, lendTokenUnlocked: false, unlockInProgress: false};
    case UNLOCK_TOKEN:
    case LOCK_TOKEN:
      return {...state, unlockInProgress: true};
    case LOCK_TOKEN_FAIL:
    case UNLOCK_TOKEN_FAIL:
      return {...state, unlockInProgress: false};
    case GET_TOKEN_LOCK_SUCCESS:
      return {...state, lendTokenUnlocked: action.unlocked, unlockInProgress: false};
    // case FILL_LOAN_SUCCESS:
    //   return {...state, modalVisible: false};
    case GET_TOKEN_LOCK:
    default:
      return state;
  }
}