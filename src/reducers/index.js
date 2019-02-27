import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  SELECT_CURRENCY,
  SELECT_CURRENCY_SUCCESS,
  ALLOW_COLLATERAL_SUCCESS,
  GET_WALLET_INFO_SUCCESS,
  FETCH_MY_OUTSTANDING_LOANS_SUCCESS,
  RESET_LOAN_FORM,
  HIDE_LOAN_CONFIRMATION,
  SHOW_LOAN_CONFIRMATION,
  GET_TOKEN_BALANCE_SUCCESS,
  CHANGE_DEBT_ORDER_CONFIRMATION_STEP,
  UNLOCK_COLLATERAL_TOKEN_SUCCESS,
  LOCK_COLLATERAL_TOKEN_SUCCESS,
  UNLOCK_COLLATERAL_TOKEN,
  LOCK_COLLATERAL_TOKEN
} from '../actions';
import { getDefaultAccount } from '../common/services/web3Service';
import loanRequestReducer from './loanRequestReducer';
import loanIssuedReducer from './loanIssuedReducer';
import fundConfirmationReducer from './fundConfirmationReducer';
import myOpenLoanRequestsReducer from './myOpenLoanRequestsReducer';
import myFundedLoansReducer from './myFundedLoansReducer';
import placeLoanReducer from './placeLoanReducer';
import fillLoanReducer from './fillLoanReducer';
import tokenBalancesReducer from './tokenBalancesReducer';
import { SUPPORTED_TOKENS } from '../common/api/config';

function walletInfoReducer(state = {
  address: getDefaultAccount(),
  amount: null,
  selectedCurrency: SUPPORTED_TOKENS[0],
  isProcessing: false
}, action) {
  switch (action.type) {
    case SELECT_CURRENCY:
      return { ...state, selectedCurrency: action.currency, isProcessing: true };
    case SELECT_CURRENCY_SUCCESS:
      return { ...state, amount: action.balance, isProcessing: false };
    case GET_WALLET_INFO_SUCCESS:
      return { ...state, amount: action.balance, address: action.address };
    case GET_TOKEN_BALANCE_SUCCESS:
      if (state.selectedCurrency === action.token) {
        return { ...state, amount: action.amount }
      }
      return state;
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

function myOutstandingLoansReducer(state = [], action) {
  switch (action.type) {
    case FETCH_MY_OUTSTANDING_LOANS_SUCCESS:
      return action.debts;
    default:
      return state;
  }
}

function debtOrderConfirmationReducer(state = {
  modalVisible: false,
  stepNumber: 1,
  collateralTokenUnlocked: false,
  unlockInProgress: false
}, action) {
  switch (action.type) {
    case SHOW_LOAN_CONFIRMATION:
      return { ...state, modalVisible: true, stepNumber: 1, collateralTokenUnlocked: false, ...action.debtOrder };
    case HIDE_LOAN_CONFIRMATION:
      return { ...state, modalVisible: false };
    case ALLOW_COLLATERAL_SUCCESS:
      return { ...state, modalVisible: true, ...action.debtOrder };
    case CHANGE_DEBT_ORDER_CONFIRMATION_STEP:
      return { ...state, stepNumber: action.step };
    case UNLOCK_COLLATERAL_TOKEN_SUCCESS:
      return { ...state, collateralTokenUnlocked: true, unlockInProgress: false };
    case LOCK_COLLATERAL_TOKEN_SUCCESS:
      return { ...state, collateralTokenUnlocked: false, unlockInProgress: false };
    case UNLOCK_COLLATERAL_TOKEN:
    case LOCK_COLLATERAL_TOKEN:
      return { ...state, unlockInProgress: true }
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
  tokenBalances: tokenBalancesReducer,
  form: formReducer
});

export default rootReducer;