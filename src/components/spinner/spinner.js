import React, {Component} from 'react';
import './spinner.css';

class Spinner extends Component {
  render() {

    return (
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    );
  }
}

export default Spinner;