import React, { Component } from 'react';
import Confirm from '../confirm/confirm';
import { calculateRepaymentAmount, calculateTotalPaymentAmount, convertToRelayerAmortizationFrequency } from '../../common/services/utilities';

class ConfirmFund extends Component {
  render() {
    let { onConfirm, onCancel, isLoading, loanRequest } = this.props;

    let amount = loanRequest.dharmaDebtOrder.principalAmount;
    let token = loanRequest.dharmaDebtOrder.principalTokenSymbol;
    let termLength = loanRequest.dharmaDebtOrder.termLength.toNumber();
    let amortizationUnit = loanRequest.dharmaDebtOrder.amortizationUnit;
    let collateralAmount = loanRequest.dharmaDebtOrder.collateralAmount;
    let collateralType = loanRequest.dharmaDebtOrder.collateralTokenSymbol;
    let interest = loanRequest.dharmaDebtOrder.interestRate.toFixed(2);
    let numberOfPayments = termLength;
    let repaymentAmount = calculateRepaymentAmount(amount, loanRequest.dharmaDebtOrder.interestRate, numberOfPayments);
    let totalPaymentAmount = calculateTotalPaymentAmount(amount, loanRequest.dharmaDebtOrder.interestRate);
    let amortizationFrequency = convertToRelayerAmortizationFrequency(amortizationUnit);

    return (
      <Confirm
        header="You are about to fund a loan with the following terms:"
        confirmText="FUND"
        cancelText="CANCEL"
        onConfirm={() => onConfirm(loanRequest)}
        onCancel={onCancel}
        isLoading={isLoading}>

        <div className="confirm__row">
          Loan amount: <strong>{amount.toFormat(5)}</strong> {token}
        </div>
        <div className="confirm__row">
          Loan term: <strong>{termLength}</strong> {amortizationUnit}
        </div>
        <div className="confirm__row">
          Interest rate: <strong>{interest}</strong> %
        </div>
        {
          collateralAmount && (
            <div className="confirm__row">
              Collateral amount: <strong>{collateralAmount.toFormat(5)}</strong> {collateralType}
            </div>
          )
        }
        <div className="confirm__row">
          Total loan repayment amount: <strong>{totalPaymentAmount.toFormat(5)}</strong> {token}
        </div>
        <div className="confirm__row">
          Number of payments: <strong>{numberOfPayments}</strong>
        </div>
        <div className="confirm__row">
          Payment frequency: <strong>{amortizationFrequency}</strong>
        </div>
        <div className="confirm__row">
          Payment amount: <strong>{repaymentAmount.toFormat(5)}</strong> {token}
        </div>
      </Confirm>
    );
  }
}


export default ConfirmFund;