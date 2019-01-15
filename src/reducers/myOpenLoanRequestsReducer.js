import { FETCH_MY_OPEN_LOAN_REQUESTS_SUCCESS } from '../actions';

export default function (state = [], action){
  switch(action.type){
    case FETCH_MY_OPEN_LOAN_REQUESTS_SUCCESS:
      return action.debts;
    default:
      return state;
  }
}