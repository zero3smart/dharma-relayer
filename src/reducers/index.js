import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import * as CurrencyCodes from '../common/currencyCodes.js';
import {
  SELECT_CURRENCY,
  ALLOW_COLLATERAL_SUCCESS,
  GET_WALLET_BALANCE_SUCCESS,
  FETCH_MY_OUTSTANDING_LOANS_SUCCESS,
  RESET_LOAN_FORM,
  HIDE_LOAN_CONFIRMATION,
  SHOW_LOAN_CONFIRMATION
} from '../actions';
import web3 from '../common/services/web3Service';
import loanRequestReducer from './loanRequestReducer';
import loanIssuedReducer from './loanIssuedReducer';
import fundConfirmationReducer from './fundConfirmationReducer';
import myOpenLoanRequestsReducer from './myOpenLoanRequestsReducer';
import myFundedLoansReducer from './myFundedLoansReducer';
import placeLoanReducer from './placeLoanReducer';
import fillLoanReducer from './fillLoanReducer';

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

function myOutstandingLoansReducer(state = [], action){
  switch(action.type){
    case FETCH_MY_OUTSTANDING_LOANS_SUCCESS:
      return action.debts;
    default:
      return state;
  }
}

function debtOrderConfirmationReducer(state = {
  modalVisible:false
}, action){
  switch(action.type){
    case SHOW_LOAN_CONFIRMATION:
      return {...state, modalVisible:true, ...action.debtOrder};
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
  myOpenLoanRequests: myOpenLoanRequestsReducer,
  myFundedLoans: myFundedLoansReducer,
  loanRequests: loanRequestReducer,
  loanIssued: loanIssuedReducer,
  myOutstandingLoans: myOutstandingLoansReducer,
  debtOrderConfirmation: debtOrderConfirmationReducer,
  fundConfirmation: fundConfirmationReducer,
  placeLoan: placeLoanReducer,
  fillLoan: fillLoanReducer,
  form: formReducer
});

export default rootReducer;