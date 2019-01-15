import {RELAYER_AMORTIZATION_FREQUENCIES} from '../../common/amortizationFrequencies';

export const calculateCollateralAmount = debtAmount => 1.5 * debtAmount;

export const calculateNumberOfPayments = (amortizationFrequency, termInDays) => {
  if (amortizationFrequency === RELAYER_AMORTIZATION_FREQUENCIES.WEEKLY){
    return termInDays / 7;
  }
  else if (amortizationFrequency === RELAYER_AMORTIZATION_FREQUENCIES.MONTHLY){
    return termInDays / 30;
  }
  else if (amortizationFrequency === RELAYER_AMORTIZATION_FREQUENCIES.END){
    return 1;
  }
  return termInDays;
};


export const calculateRepaymentAmount = (amount, interestRate) => amount * (1 + (interestRate/100));
export const calculateTotalPaymentAmount = (repaymentAmount, termLengthInAmortizationUnits) => repaymentAmount / termLengthInAmortizationUnits;