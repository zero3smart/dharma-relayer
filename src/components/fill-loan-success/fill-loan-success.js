import React, {Component} from 'react';
import '../confirm/confirm.css';

class FillLoanSuccess extends Component{
  render(){
    let {onConfirm, amount, token} = this.props;

    return (
      <div>
        <div className="confirm">
          <div className="confirm__row">
            <div className="confirm__header"><h5>You have successfully funded a loan for  tokens!</h5></div>
          </div>
          <div className="confirm__buttons">
            <div className="confirm__btn-wrapper confirm__btn-wrapper_centered">
              <button
                className="confirm__btn confirm__btn_confirm"
                onClick={() => onConfirm && onConfirm()}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default FillLoanSuccess;