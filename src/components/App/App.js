import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../../reducers';
import './App.css';
import UserInfo from '../user-info/user-info.js';
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
              <UserInfo />
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
