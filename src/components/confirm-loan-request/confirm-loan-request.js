import React, {Component} from 'react';
import {calculateNumberOfPayments, calculateRepaymentAmount, calculateTotalPaymentAmount} from '../../common/services/utilities';
import Confirm from '../confirm/confirm';

class ConfirmLoanRequest extends Component{
  render(){
    let {onConfirm, onCancel, isLoading, ...values} = this.props;
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
        onCancel={onCancel}
        isLoading={isLoading}>

        <div className="confirm__row">
          <b>Loan amount: </b>{amount} {currency}
        </div>
        <div className="confirm__row">
          <b>Loan term: </b>{term} days
        </div>
        <div className="confirm__row">
          <b>Maximum interest rate willing to pay: </b>{maxInterest} %
        </div>
        {/*
          <div className="confirm__row">
            Collateral amount: {collateralAmount} {collateralType}
          </div>
        */}
        <div className="confirm__row">
          <b>Total loan repayment amount: </b>{repaymentAmount} {currency}
        </div>
        <div className="confirm__row">
          <b>Number of payments: </b>{numberOfPayments}
        </div>
        <div className="confirm__row">
          <b>Payment frequency: </b>{amortizationFrequency}
        </div>
        <div className="confirm__row">
          <b>Payment amount: </b>{totalPaymentAmount} {currency}
        </div>
        <br/>
        <div className="confirm__row">
          <b>Relayer fees: </b>0.00%
        </div>
        <hr/>
      </Confirm>
    );
  }
}


export default ConfirmLoanRequest;