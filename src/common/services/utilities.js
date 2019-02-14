import {
  RELAYER_AMORTIZATION_FREQUENCIES,
  DHARMA_AMORTIZATION_UNITS
} from '../../common/amortizationFrequencies';
import {
  LOANSCAN_URL
} from '../../common/api/urls'

export const calculateCollateralAmount = debtAmount => 1.5 * debtAmount;

export const calculateNumberOfPayments = (amortizationFrequency, termInDays) => {
  if (amortizationFrequency === RELAYER_AMORTIZATION_FREQUENCIES.WEEKLY) {
    return termInDays / 7;
  } else if (amortizationFrequency === RELAYER_AMORTIZATION_FREQUENCIES.MONTHLY) {
    return termInDays / 30;
  } else if (amortizationFrequency === RELAYER_AMORTIZATION_FREQUENCIES.END) {
    return 1;
  }
  return termInDays;
};


export const calculateRepaymentAmount = (amount, interestRate) => amount * (1 + (interestRate / 100));

export const calculateTotalPaymentAmount = (repaymentAmount, termLengthInAmortizationUnits) => repaymentAmount / termLengthInAmortizationUnits;

export const convertToRelayerAmortizationFrequency = (dharmaAmortizationUnits) => {
  if (dharmaAmortizationUnits === DHARMA_AMORTIZATION_UNITS.DAYS) {
    return RELAYER_AMORTIZATION_FREQUENCIES.DAILY;
  }
  if (dharmaAmortizationUnits === DHARMA_AMORTIZATION_UNITS.WEEKS) {
    return RELAYER_AMORTIZATION_FREQUENCIES.WEEKLY;
  }
  if (dharmaAmortizationUnits === DHARMA_AMORTIZATION_UNITS.MONTHS) {
    return RELAYER_AMORTIZATION_FREQUENCIES.MONTHLY;
  }
  if (dharmaAmortizationUnits === DHARMA_AMORTIZATION_UNITS.HOURS) {
    console.error("Currently we don't support 'hours' units");
    return null;
  }
  if (dharmaAmortizationUnits === DHARMA_AMORTIZATION_UNITS.YEARS) {
    console.error("Currently we don't support 'years' units");
    return null;
  }
  console.error(`Relayer units corresponding to ${dharmaAmortizationUnits} weren't found`);
  return null;
};

export const calculateTermInDays = (dharmaAmortizationUnits, terms) => {
  if (dharmaAmortizationUnits === DHARMA_AMORTIZATION_UNITS.DAYS) {
    return terms;
  }
  if (dharmaAmortizationUnits === DHARMA_AMORTIZATION_UNITS.HOURS) {
    return terms / 24;
  }
  if (dharmaAmortizationUnits === DHARMA_AMORTIZATION_UNITS.WEEKS) {
    return terms * 7;
  }
  if (dharmaAmortizationUnits === DHARMA_AMORTIZATION_UNITS.MONTHS) {
    return terms * 30;
  }
  if (dharmaAmortizationUnits === DHARMA_AMORTIZATION_UNITS.YEARS) {
    return terms * 365;
  }
  console.error(`Relayer units corresponding to ${dharmaAmortizationUnits} weren't found`);
  return null;
};

export const isFloat = (n) => {
  return Number(n) === n && n % 1 !== 0;
};

export const formatLoanscanLink = (issuanceHash) => `${LOANSCAN_URL}/${issuanceHash.substring(2)}`;