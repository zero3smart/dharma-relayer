import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../../reducers';
import './App.css';
import WalletInfoContainer from '../../containers/wallet-info-container/wallet-info-container';
import LoanRequests from '../loan-requests/loan-requests';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  ));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <div className="app__container">
            <div className="app__content-left">
              <div className="app__wallet-info">
                <WalletInfoContainer />
              </div>
            </div>
            <div className="app__content-center">
              <LoanRequests />
            </div>
            <div className="app__content-right">right</div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
