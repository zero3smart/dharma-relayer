import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../../reducers';
import './App.css';
import AppContainer from '../../containers/app-container/app-container';

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware
  ));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <AppContainer />
        </div>
      </Provider>
    );
  }
}

export default App;