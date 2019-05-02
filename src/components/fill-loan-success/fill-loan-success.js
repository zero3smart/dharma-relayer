import React, {Component} from 'react';
import '../confirm/confirm.css';

class FillLoanSuccess extends Component{
  render(){
    let {onConfirm, loanRequest} = this.props;

    let amount = loanRequest.dharmaDebtOrder.principalAmount;
    let token = loanRequest.dharmaDebtOrder.principalTokenSymbol;

    return (
      <div>
        <div className="confirm">
          <div className="confirm__row">
            <div className="confirm__header"><h5>You have successfully funded a loan for <strong>{amount.toFormat(5)}</strong> {token} tokens!</h5></div>
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