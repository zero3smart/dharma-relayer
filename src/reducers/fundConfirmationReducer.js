import { SHOW_FUND_CONFIRMATION, HIDE_FUND_CONFIRMATION } from '../actions';

export default function (state = {
  modalVisible:false
}, action) {
  switch(action.type){
    case SHOW_FUND_CONFIRMATION:
      return { modalVisible: true, loanRequest: action.loanRequest};
    case HIDE_FUND_CONFIRMATION:
      return {...state, modalVisible: false}
    default:
      return state;
  }
}