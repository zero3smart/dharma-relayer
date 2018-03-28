import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import * as CurrencyCodes from '../common/currencyCodes.js';
import {SELECT_CURRENCY, ALLOW_COLLATERAL_SUCCESS, GET_WALLET_BALANCE_SUCCESS, FETCH_OPEN_LOAN_REQUESTS_SUCCESS} from '../actions';
import web3 from '../common/services/web3Service';
import loansRequestReducer from "./loansRequestReducer";

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
        default:
            return state;
    }
}

function openLoanRequestsReducer(state = [], action){
  switch(action.type){
    case FETCH_OPEN_LOAN_REQUESTS_SUCCESS:
      return action.debts.map(debt => ({
        amount: debt.principalAmount,
        date: '2018-03-24 17:59:59',
        term: '90 day',
        interest: '10%'
      }));
    default:
      return state;
  }
}

const rootReducer = combineReducers({
    walletInfo: walletInfoReducer,
    collateralAllowed: collateralAllowedReducer,
    loans: loansRequestReducer,
    openLoanRequests: openLoanRequestsReducer,
    form: formReducer
});

export default rootReducer;