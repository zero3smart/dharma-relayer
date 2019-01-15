import { FETCH_MY_FUNDED_LOANS_SUCCESS } from '../actions';

export default function(state = [], action){
  switch(action.type){
    case FETCH_MY_FUNDED_LOANS_SUCCESS:
      return action.debts;
    default:
      return state;
  }
}