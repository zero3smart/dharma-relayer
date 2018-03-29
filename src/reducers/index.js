import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import * as CurrencyCodes from '../common/currencyCodes.js';
import {
  SELECT_CURRENCY,
  ALLOW_COLLATERAL_SUCCESS,
  GET_WALLET_BALANCE_SUCCESS,
  FETCH_SIGNED_BY_DEBTOR_SUCCESS,
  FETCH_FILLED_DEBTS_SUCCESS

} from '../actions';
import web3 from '../common/services/web3Service';

function walletInfoReducer(state = {
  address: web3.eth.defaultAccount,
  amount: null,
  selectedCurrency: CurrencyCodes.USD
}, action){
  switch(action.type){
    case SELECT_CURRENCY:
      return {...state, selectedCurrency: action.currency};
    case GET_WALLET_BALANCE_SUCCESS:
      return {...state, amount: action.balance};
    default:
      return state;
  }
}

function collateralAllowedReducer(state = false, action){
  switch(action.type){
    case ALLOW_COLLATERAL_SUCCESS:
      return true;
    default:
      return state;
  }
}

function signedByDebtorReducer(state = [], action){
  switch(action.type){
    case FETCH_SIGNED_BY_DEBTOR_SUCCESS:
      return action.debts;
    default:
      return state;
  }
}

function filledDebtsReducer(state = [], action){
  switch(action.type){
    case FETCH_FILLED_DEBTS_SUCCESS:
      return action.debts;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  walletInfo: walletInfoReducer,
  collateralAllowed: collateralAllowedReducer,
  signedByDebtor: signedByDebtorReducer,
  filledDebts: filledDebtsReducer,
  form: formReducer
});

export default rootReducer;