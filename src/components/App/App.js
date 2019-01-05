import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../../reducers';
import './App.css';
import UserInfo from '../user-info/user-info.js';
import LoanRequests from '../../containers/loan-requests/loan-requests';
import IssuedLoans from '../../containers/issued-loans/issued-loans';
import {HOST_URL} from '../../common/api/urls'

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  ));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <div className="app__container container-fluid">
            <div className="row flex-sm-nowrap">
              <div className="app__content-left col-sm">
                <UserInfo />
              </div>
              <div className="app__content-center col-sm">
                <LoanRequests />
              </div>
              <div className="app__content-right col-sm">
                <IssuedLoans />
              </div>
            </div>
          </div>
          <div className="app__demo-link">
            <a href={`${HOST_URL}/swagger/`} target="_blank">API Documentation</a>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;