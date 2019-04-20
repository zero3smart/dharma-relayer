import React, { Component } from 'react';
import { calculateRepaymentAmount, calculateTotalPaymentAmount, isFloat } from '../../common/services/utilities';
import Confirm from '../confirm/confirm';
import BigNumber from 'bignumber.js';

class ConfirmLoanRequest extends Component {
  render() {
    let { onConfirm, onCancel, isLoading, title, confirmText, ...values } = this.props;
    let { amount, currency, term, interestRate, amortizationFrequency, amortizationUnit, collateralAmount, collateralType } = values;

    let numberOfPayments = term;
    let interestRateInPercent = new BigNumber(interestRate).div(100);
    console.log(interestRateInPercent.toFormat(5));
    let repaymentAmount = calculateRepaymentAmount(amount, interestRateInPercent, term);
    let totalPaymentAmount = calculateTotalPaymentAmount(amount, interestRateInPercent);

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
            Loan amount: <strong>{new BigNumber(amount).toFormat(3)}</strong> {currency}
          </div>
          <div className="confirm__row">
            Loan term: <strong>{term}</strong> {amortizationUnit}
          </div>
          <div className="confirm__row">
            Interest rate: <strong>{new BigNumber(interestRate).toFixed(2)}</strong> %
          </div>
          {
            collateralAmount && (
              <div className="confirm__row">
                Collateral amount: <strong>{new BigNumber(collateralAmount).toFormat(3)}</strong> {collateralType}
              </div>
            )
          }
          <div className="confirm__row">
            Total loan repayment amount: <strong>{totalPaymentAmount.toFormat(5)}</strong> {currency}
          </div>
          <div className="confirm__row">
            Number of payments: <strong>{numberOfPayments}</strong>
          </div>
          <div className="confirm__row">
            Payment frequency: <strong>{amortizationFrequency}</strong>
          </div>
          <div className="confirm__row">
            Payment amount: <strong>{repaymentAmount.toFormat(5)}</strong> {currency}
          </div>
          <br />
          <div className="confirm__row">
            Relayer fees: <strong>0.00</strong> %
          </div>
          <hr />
        </Confirm>
      </div>
    );
  }
}


export default ConfirmLoanRequest;