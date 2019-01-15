import React, {Component} from 'react';
import Confirm from '../confirm/confirm';
import {calculateNumberOfPayments, calculateRepaymentAmount, calculateTotalPaymentAmount} from '../../common/services/utilities';
import {RELAYER_AMORTIZATION_FREQUENCIES, DHARMA_AMORTIZATION_UNITS} from '../../common/amortizationFrequencies';



class ConfirmFund extends Component{
  render(){
    let {onConfirm, onCancel, isLoading, loanRequest} = this.props;

    let amount = loanRequest.principalAmount;
    let token = loanRequest.dharmaDebtOrder.principalTokenSymbol;
    let termLength = loanRequest.dharmaDebtOrder.termLength.toNumber();
    let amortizationUnit = loanRequest.dharmaDebtOrder.amortizationUnit;
    let interest = loanRequest.dharmaDebtOrder.interestRate.toNumber();

    let termInDays = termLength;
    let amortizationFrequency = null;

    if(amortizationUnit === DHARMA_AMORTIZATION_UNITS.HOURS){
      termInDays = termLength / 24;
    }
    else if(amortizationUnit === DHARMA_AMORTIZATION_UNITS.DAYS){
      termInDays = termLength;
      amortizationFrequency = RELAYER_AMORTIZATION_FREQUENCIES.DAILY;
    }
    else if(amortizationUnit === DHARMA_AMORTIZATION_UNITS.WEEKS){
      termInDays = termLength * 7;
      amortizationFrequency = RELAYER_AMORTIZATION_FREQUENCIES.WEEKLY;
    }
    else if(amortizationUnit === DHARMA_AMORTIZATION_UNITS.MONTHS){
      termInDays = termLength * 30;
      amortizationFrequency = RELAYER_AMORTIZATION_FREQUENCIES.MONTHLY;
    }
    else if(amortizationUnit === DHARMA_AMORTIZATION_UNITS.YEARS){
      termInDays = amortizationUnit * 365;
    }

    let numberOfPayments = calculateNumberOfPayments(amortizationFrequency, termInDays);
    let repaymentAmount = calculateRepaymentAmount(amount, interest);
    let totalPaymentAmount = calculateTotalPaymentAmount(repaymentAmount, termLength);

    return (
      <Confirm
        header="You are about to fund a loan with the following terms:"
        confirmText="FUND"
        cancelText="CANCEL"
        onConfirm={() => onConfirm(loanRequest)}
        onCancel={onCancel}
        isLoading = {isLoading}>

        <div className="confirm__row">
          <b>Loan amount: </b>{amount} {token}
        </div>
        <div className="confirm__row">
          <b>Loan term: </b>{termInDays} days
        </div>
        <div className="confirm__row">
          <b>Maximum interest rate willing to pay: </b>{interest} %
        </div>
        {/*
         <div className="confirm__row">
         Collateral amount: ?????
         </div>
        */}
        <div className="confirm__row">
          <b>Total loan repayment amount: </b>{repaymentAmount} {token}
        </div>
        <div className="confirm__row">
          <b>Number of payments: </b>{termLength}
        </div>
        <div className="confirm__row">
          <b>Payment frequency: </b>{amortizationFrequency}
        </div>
        <div className="confirm__row">
          <b>Payment amount: </b>{totalPaymentAmount} {token}
        </div>
      </Confirm>
    );
  }
}


export default ConfirmFund;