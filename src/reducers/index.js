import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  SELECT_CURRENCY,
  SELECT_CURRENCY_SUCCESS,
  GET_WALLET_INFO_SUCCESS,
  GET_TOKEN_BALANCE_SUCCESS,
} from '../actions';
import { getDefaultAccount } from '../common/services/web3Service';
import loanRequestReducer from './loanRequestReducer';
import loanIssuedReducer from './loanIssuedReducer';
import fundConfirmationReducer from './fundConfirmationReducer';
import myOpenLoanRequestsReducer from './myOpenLoanRequestsReducer';
import myFundedLoansReducer from './myFundedLoansReducer';
import myOutstandingLoansReducer from './myOutstandingLoansReducer';
import placeLoanReducer from './placeLoanReducer';
import fillLoanReducer from './fillLoanReducer';
import tokenBalancesReducer from './tokenBalancesReducer';
import debtOrderConfirmationReducer from './debtOrderConfirmationReducer';
import repayLoanReducer from './repayLoanReducer';
import disclosureConfirmationReducer from './disclosureConfirmationReducer';

function walletInfoReducer(state = {
  address: getDefaultAccount(),
  amount: null,
  selectedCurrency: 'ETH',
  isProcessing:false
}, action) {
  switch (action.type) {
    case SELECT_CURRENCY:
      return { ...state, selectedCurrency: action.currency, isProcessing:true };
    case SELECT_CURRENCY_SUCCESS:
      return { ...state, amount: action.balance, isProcessing:false };
    case GET_WALLET_INFO_SUCCESS:
      return { ...state, amount: action.balance, address: action.address };
    case GET_TOKEN_BALANCE_SUCCESS:
      if(state.selectedCurrency === action.token){
        return {...state, amount: action.amount}
      }
      return state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  walletInfo: walletInfoReducer,
  myOpenLoanRequests: myOpenLoanRequestsReducer,
  myFundedLoans: myFundedLoansReducer,
  loanRequests: loanRequestReducer,
  loanIssued: loanIssuedReducer,
  myOutstandingLoans: myOutstandingLoansReducer,
  debtOrderConfirmation: debtOrderConfirmationReducer,
  fundConfirmation: fundConfirmationReducer,
  disclosureConfirmation: disclosureConfirmationReducer,
  placeLoan: placeLoanReducer,
  fillLoan: fillLoanReducer,
  repayLoan: repayLoanReducer,
  tokenBalances: tokenBalancesReducer,
  form: formReducer
});

export default rootReducer;