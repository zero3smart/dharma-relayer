import React, { Component } from 'react';
import { calculateRepaymentAmount, calculateTotalPaymentAmount, isFloat } from '../../common/services/utilities';
import Confirm from '../confirm/confirm';

class ConfirmLoanRequest extends Component {
  render() {
    let { onConfirm, onCancel, isLoading, title, confirmText, ...values } = this.props;
    let { amount, currency, term, interestRate, amortizationFrequency, amortizationUnit, collateralAmount, collateralType } = values;

    let numberOfPayments = term;
    let repaymentAmount = calculateRepaymentAmount(amount, interestRate, term);
    let totalPaymentAmount = calculateTotalPaymentAmount(amount, interestRate);

    return (
      <div>
        <Confirm
          header={title || "You are about to create a loan request with the following terms:"}
          confirmText={confirmText || "PLACE LOAN REQUEST"}
          cancelText="BACK"
          onConfirm={() => onConfirm(values)}
          onCancel={onCancel}
          isLoading={isLoading}>

          <div className="confirm__row">
            Loan amount: <strong>{isFloat(amount) ? amount.toFixed(5) : amount}</strong> {currency}
          </div>
          <div className="confirm__row">
            Loan term: <strong>{term}</strong> {amortizationUnit}
          </div>
          <div className="confirm__row">
            Interest rate: <strong>{interestRate * 100}</strong> %
          </div>
          {
            collateralAmount && (
              <div className="confirm__row">
                Collateral amount: <strong>{collateralAmount}</strong> {collateralType}
              </div>
            )
          }
          <div className="confirm__row">
            Total loan repayment amount:
            <strong>{isFloat(totalPaymentAmount) ? totalPaymentAmount.toFixed(5) : totalPaymentAmount}</strong> {currency}
          </div>
          <div className="confirm__row">
            Number of payments: <strong>{numberOfPayments}</strong>
          </div>
          <div className="confirm__row">
            Payment frequency: <strong>{amortizationFrequency}</strong>
          </div>
          <div className="confirm__row">
            Payment amount:
            <strong>{isFloat(repaymentAmount) ? repaymentAmount.toFixed(5) : repaymentAmount}</strong> {currency}
          </div>
          <br />
          <div className="confirm__row">
            Relayer fees: <strong>0.00%</strong>
          </div>
          <hr />
        </Confirm>
      </div>
    );
  }
}


export default ConfirmLoanRequest;