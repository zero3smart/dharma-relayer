import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import * as CurrencyCodes from '../common/currencyCodes.js';
import {
  SELECT_CURRENCY,
  ALLOW_COLLATERAL_SUCCESS,
  GET_WALLET_BALANCE_SUCCESS,
  FETCH_SIGNED_BY_DEBTOR_SUCCESS,
  FETCH_FILLED_DEBTS_SUCCESS,
  RESET_LOAN_FORM,
  HIDE_LOAN_CONFIRMATION
} from '../actions';
import web3 from '../common/services/web3Service';
import loanRequestReducer from './loanRequestReducer';
import loanIssuedReducer from './loanIssuedReducer';
import fundConfirmationReducer from './fundConfirmationReducer';

function walletInfoReducer(state = {
    address: web3.eth.defaultAccount,
    amount: null,
    selectedCurrency: CurrencyCodes.USD
}, action) {
    switch (action.type) {
        case SELECT_CURRENCY:
            return {...state, selectedCurrency: action.currency};
        case GET_WALLET_BALANCE_SUCCESS:
            return {...state, amount: action.balance};
        default:
            return state;
    }
}

function collateralAllowedReducer(state = false, action) {
  switch (action.type) {
    case ALLOW_COLLATERAL_SUCCESS:
      return true;
  case RESET_LOAN_FORM:
    return false;
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

function debtOrderConfirmationReducer(state = {
  modalVisible:false
}, action){
  switch(action.type){
    case HIDE_LOAN_CONFIRMATION:
      return {...state, modalVisible: false};
    case ALLOW_COLLATERAL_SUCCESS:
      return {...state, modalVisible: true, ...action.debtOrder};
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  walletInfo: walletInfoReducer,
  collateralAllowed: collateralAllowedReducer,
  signedByDebtor: signedByDebtorReducer,
  loanRequests: loanRequestReducer,
  loanIssued: loanIssuedReducer,
  filledDebts: filledDebtsReducer,
  debtOrderConfirmation: debtOrderConfirmationReducer,
  fundConfirmation: fundConfirmationReducer,
  form: formReducer
});

export default rootReducer;