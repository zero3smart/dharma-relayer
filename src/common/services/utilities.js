import { RELAYER_AMORTIZATION_FREQUENCIES, DHARMA_AMORTIZATION_UNITS } from '../../common/amortizationFrequencies';
import { LOANSCAN_URL } from '../../common/api/config'
import BigNumber from 'bignumber.js';

export const calculateRepaymentAmount = (amount, interestRate, numberOfPayments) =>
	calculateTotalPaymentAmount(amount, interestRate).div(new BigNumber(numberOfPayments));

export const calculateTotalPaymentAmount = (amount, interestRate) => new BigNumber(amount).times(new BigNumber(interestRate).add(1));

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
		return RELAYER_AMORTIZATION_FREQUENCIES.HOURLY;
	}
	if (dharmaAmortizationUnits === DHARMA_AMORTIZATION_UNITS.YEARS) {
		return RELAYER_AMORTIZATION_FREQUENCIES.YEARLY;
	}
	console.error(`Relayer units corresponding to ${dharmaAmortizationUnits} weren't found`);
	return null;
};

export const formatLoanscanLink = (issuanceHash) => `${LOANSCAN_URL}/${issuanceHash}`;