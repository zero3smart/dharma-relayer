import * as amortizationValues from '../../common/amortizationFrequencies';

export const calculateCollateralAmount = debtAmount => 1.5 * debtAmount;

export const calculateNumberOfPayments = (amortizationFrequency, termInDays) => {
  if (amortizationFrequency === amortizationValues.WEEKLY){
    return termInDays / 7;
  }
  else if (amortizationFrequency === amortizationValues.MONTHLY){
    return termInDays / 30;
  }
  else if (amortizationFrequency === amortizationValues.END){
    return 1;
  }
  return termInDays;
};


export const calculateRepaymentAmount = (amount, interestRate, termLengthInAmortizationUnits) => amount * (1 + (interestRate/100) * termLengthInAmortizationUnits);