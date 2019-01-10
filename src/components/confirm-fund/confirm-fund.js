import React, {Component} from 'react';
import './confirm.css';

class Confirm extends Component{
  render(){
    let {header, confirmText, cancelText, onConfirm, onCancel} = this.props;

    return (
      <div className="confirm">
        <div className="confirm__row">
          <span className="confirm__header">{header}</span>
        </div>
        <br/>
        {this.props.children}
        <div className="confirm__buttons">
          <div className="confirm__btn-wrapper">
            <button
              className="confirm__btn confirm__btn_confirm"
              onClick={() => onConfirm && onConfirm()}>
              {confirmText}
            </button>
            <button
              className="confirm__btn confirm__btn_cancel"
              onClick={() => onCancel && onCancel()}>
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;