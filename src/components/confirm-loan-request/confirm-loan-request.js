import React, {Component} from 'react';
import {calculateNumberOfPayments, calculateRepaymentAmount, calculateTotalPaymentAmount, isFloat} from '../../common/services/utilities';
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
          <b>Loan amount: </b><strong>{isFloat(amount) ? amount.toFixed(5) : amount}</strong> {currency}
        </div>
        <div className="confirm__row">
          <b>Loan term: </b><strong>{term}</strong> days
        </div>
        <div className="confirm__row">
          <b>Interest rate: </b><strong>{maxInterest}</strong> %
        </div>
        {/*
          <div className="confirm__row">
            Collateral amount: {collateralAmount} {collateralType}
          </div>
        */}
        <div className="confirm__row">
          <b>Total loan repayment amount: </b><strong>{isFloat(repaymentAmount) ? repaymentAmount.toFixed(5) : repaymentAmount}</strong> {currency}
        </div>
        <div className="confirm__row">
          <b>Number of payments: </b><strong>{numberOfPayments}</strong>
        </div>
        <div className="confirm__row">
          <b>Payment frequency: </b><strong>{amortizationFrequency}</strong>
        </div>
        <div className="confirm__row">
          <b>Payment amount: </b><strong>{isFloat(totalPaymentAmount) ? totalPaymentAmount.toFixed(5) : totalPaymentAmount}</strong> {currency}
        </div>
        <br/>
        <div className="confirm__row">
          <b>Relayer fees: </b><strong>0.00%</strong>
        </div>
        <hr/>
      </Confirm>
    );
  }
}


export default ConfirmLoanRequest;