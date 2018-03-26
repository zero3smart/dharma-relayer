import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import LoanRequests from '../loan-requests/loan-requests';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app__container">
          <div className="app__content-left">left</div>
          <div className="app__content-center">
            <LoanRequests />
          </div>
          <div className="app__content-right">right</div>
        </div>
      </div>
    );
  }
}

export default App;
