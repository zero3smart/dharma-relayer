import { combineReducers } from 'redux';

function walletInfoReducer(state = {
  address: '0x12321124123123dfafa23414ecdfsadf2',
  amount: '100'
}, action){
  switch(action.type){
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  walletInfo: walletInfoReducer
});

export default rootReducer;