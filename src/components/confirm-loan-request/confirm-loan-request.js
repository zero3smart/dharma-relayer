import React, {Component} from 'react';
import './confirm-loan-request.css';
import {calculateNumberOfPayments, calculateRepaymentAmount} from '../../common/services/utilities';

class ConfirmLoanRequest extends Component{
  render(){
    let {onConfirm, onCancel, ...values} = this.props;
    let {amount, currency, term, maxInterest, amortizationFrequency, collateralAmount, collateralType} = values;

    let numberOfPayments = calculateNumberOfPayments(amortizationFrequency, term);
    let repaymentAmount = calculateRepaymentAmount(amount, maxInterest, numberOfPayments);

    return (
      <div className="confirm-loan">
        <div className="confirm-loan__row">
          <span className="confirm-loan__header">You are about to create a loan request with the following terms:</span>
        </div>
        <br/>
        <div className="confirm-loan__row">
          Loan amount: {amount} {currency}
        </div>
        <div className="confirm-loan__row">
          Loan term: {term} days
        </div>
        <div className="confirm-loan__row">
          Maximum interest rate willing to pay: {maxInterest} %
        </div>
        <div className="confirm-loan__row">
          Collateral amount: {collateralAmount} {collateralType}
        </div>
        <div className="confirm-loan__row">
          Total loan repayment amount: {repaymentAmount} {currency}
        </div>
        <div className="confirm-loan__row">
          Number of payments: {numberOfPayments}
        </div>
        <div className="confirm-loan__row">
          Payment frequency: {amortizationFrequency}
        </div>
        <div className="confirm-loan__row">
          Payment amount: xxx DAI
        </div>
        <br/>
        <div className="confirm-loan__row">
          Relayer fees: 0.00%
        </div>
        <hr/>
        <div className="confirm-loan__buttons">
          <div className="confirm-loan__btn-wrapper">
            <button
              className="confirm-loan__btn confirm-loan__btn_confirm"
              onClick={() => onConfirm && onConfirm(values)}>
              PLACE LOAN REQUEST
            </button>
            <button
              className="confirm-loan__btn confirm-loan__btn_cancel"
              onClick={() => onCancel && onCancel()}>
              CANCEL LOAN REQUEST
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmLoanRequest;