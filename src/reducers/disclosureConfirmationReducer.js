import { SHOW_DISCLOSURE, HIDE_DISCLOSURE, CONFIRM_DISCLOSURE } from '../actions';

export default function (state = {
  modalVisible: true,
  confirm: false
}, action) {
  switch(action.type){
    case SHOW_DISCLOSURE:
      return { modalVisible: true, confirm: false };
    case HIDE_DISCLOSURE:
      return {...state, modalVisible: false};
    case CONFIRM_DISCLOSURE:
      return {...state, modalVisible: false};
    default:
      return state;
  }
}