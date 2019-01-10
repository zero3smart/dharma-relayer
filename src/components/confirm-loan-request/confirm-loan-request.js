import React, {Component} from 'react';
import {calculateNumberOfPayments, calculateRepaymentAmount, calculateTotalPaymentAmount} from '../../common/services/utilities';
import Confirm from '../confirm/confirm';

class ConfirmLoanRequest extends Component{
  render(){
    let {onConfirm, onCancel, ...values} = this.props;
    let {amount, currency, term, maxInterest, amortizationFrequency, collateralAmount, collateralType} = values;

    let numberOfPayments = calculateNumberOfPayments(amortizationFrequency, term);
    let repaymentAmount = calculateRepaymentAmount(amount, maxInterest);
    let totalPaymentAmount = calculateTotalPaymentAmount(repaymentAmount, numberOfPayments);

    return (
      <Confirm
        header="You are about to create a loan request with the following terms:"
        confirmText="PLACE LOAN REQUEST"
        cancelText="CANCEL LOAN REQUEST"
        onConfirm={() => onConfirm(values)}
        onCancel={onCancel}>

        <div className="confirm__row">
          Loan amount: {amount} {currency}
        </div>
        <div className="confirm__row">
          Loan term: {term} days
        </div>
        <div className="confirm__row">
          Maximum interest rate willing to pay: {maxInterest} %
        </div>
        <div className="confirm__row">
          Collateral amount: {collateralAmount} {collateralType}
        </div>
        <div className="confirm__row">
          Total loan repayment amount: {repaymentAmount} {currency}
        </div>
        <div className="confirm__row">
          Number of payments: {numberOfPayments}
        </div>
        <div className="confirm__row">
          Payment frequency: {amortizationFrequency}
        </div>
        <div className="confirm__row">
          Payment amount: {totalPaymentAmount} {currency}
        </div>
        <br/>
        <div className="confirm__row">
          Relayer fees: 0.00%
        </div>
        <hr/>
      </Confirm>
    );
  }
}


export default ConfirmLoanRequest;