import React, { Component } from 'react';
import Confirm from '../confirm/confirm';
import { calculateRepaymentAmount, calculateTotalPaymentAmount, convertToRelayerAmortizationFrequency, isFloat } from '../../common/services/utilities';

class ConfirmFund extends Component {
    render() {
        let { onConfirm, onCancel, isLoading, loanRequest } = this.props;

        let amount = loanRequest.dharmaDebtOrder.principalAmount.toNumber();
        let token = loanRequest.dharmaDebtOrder.principalTokenSymbol;
        let termLength = loanRequest.dharmaDebtOrder.termLength.toNumber();
        let amortizationUnit = loanRequest.dharmaDebtOrder.amortizationUnit;
        let interest = loanRequest.dharmaDebtOrder.interestRate.toNumber();
        let numberOfPayments = termLength;
        let repaymentAmount = calculateRepaymentAmount(amount, interest, numberOfPayments);
        let totalPaymentAmount = calculateTotalPaymentAmount(loanRequest.dharmaDebtOrder.principalAmount, loanRequest.dharmaDebtOrder.interestRate);
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
                    Loan amount: <strong>{isFloat(amount) ? amount.toFixed(5) : amount}</strong> {token}
                </div>
                <div className="confirm__row">
                    Loan term: <strong>{termLength}</strong> {amortizationUnit}
                </div>
                <div className="confirm__row">
                    Interest rate: <strong>{interest * 100}</strong> %
        </div>
                {/*
         <div className="confirm__row">
         Collateral amount: ?????
         </div>
        */}
                <div className="confirm__row">
                    Total loan repayment amount: <strong>{totalPaymentAmount.toFormat(3)}</strong> {token}
                </div>
                <div className="confirm__row">
                    Number of payments: <strong>{numberOfPayments}</strong>
                </div>
                <div className="confirm__row">
                    Payment frequency: <strong>{amortizationFrequency}</strong>
                </div>
                <div className="confirm__row">
                    Payment amount: <strong>{isFloat(repaymentAmount) ? repaymentAmount.toFixed(5) : repaymentAmount}</strong> {token}
                </div>
            </Confirm>
        );
    }
}


export default ConfirmFund;