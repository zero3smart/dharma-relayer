import { combineReducers } from 'redux';
import * as CurrencyCodes from '../common/currencyCodes.js';
import {SELECT_CURRENCY} from '../actions';

function walletInfoReducer(state = {
  address: '0x12321124123123dfafa23414ecdfsadf2',
  amount: 100,
  selectedCurrency: CurrencyCodes.USD
}, action){
  switch(action.type){
    case SELECT_CURRENCY:
      return {...state, selectedCurrency: action.currency};
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  walletInfo: walletInfoReducer
});

export default rootReducer;