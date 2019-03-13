import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

console.log(`Environment: ${process.env.NODE_ENV}`)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();