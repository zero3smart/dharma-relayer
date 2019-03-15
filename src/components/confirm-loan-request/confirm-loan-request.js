import React, { Component } from 'react';
import { calculateNumberOfPayments, calculateRepaymentAmount, calculateTotalPaymentAmount, isFloat } from '../../common/services/utilities';
import Confirm from '../confirm/confirm';

class ConfirmLoanRequest extends Component {
  render() {
    let { onConfirm, onCancel, isLoading, ...values } = this.props;
    let { amount, currency, term, maxInterest, amortizationFrequency, collateralAmount, collateralType } = values;

    let numberOfPayments = calculateNumberOfPayments(amortizationFrequency, term);
    let repaymentAmount = calculateRepaymentAmount(amount, maxInterest);
    let totalPaymentAmount = calculateTotalPaymentAmount(repaymentAmount, numberOfPayments);

    return (
      <div>
        <Confirm
          header="You are about to create a loan request with the following terms:"
          confirmText="PLACE LOAN REQUEST"
          cancelText="BACK"
          onConfirm={() => onConfirm(values)}
          onCancel={onCancel}
          isLoading={isLoading}>

          <div className="confirm__row">
            Loan amount: <strong>{isFloat(amount) ? amount.toFixed(5) : amount}</strong> {currency}
          </div>
          <div className="confirm__row">
            Loan term: <strong>{term}</strong> days
            </div>
          <div className="confirm__row">
            Interest rate: <strong>{maxInterest}</strong> %
            </div>
          {
            collateralAmount && (
              <div className="confirm__row">
                Collateral amount: <strong>{collateralAmount}</strong> {collateralType}
              </div>
            )
          }
          <div className="confirm__row">
            Total loan repayment amount: <strong>{isFloat(repaymentAmount) ? repaymentAmount.toFixed(5) : repaymentAmount}</strong> {currency}
          </div>
          <div className="confirm__row">
            Number of payments: <strong>{numberOfPayments}</strong>
          </div>
          <div className="confirm__row">
            Payment frequency: <strong>{amortizationFrequency}</strong>
          </div>
          <div className="confirm__row">
            Payment amount: <strong>{isFloat(totalPaymentAmount) ? totalPaymentAmount.toFixed(5) : totalPaymentAmount}</strong> {currency}
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