import { RELAYER_AMORTIZATION_FREQUENCIES, DHARMA_AMORTIZATION_UNITS } from "../../common/amortizationFrequencies";

export const DAYS = Array.from({ length: 30 }, (v, k) => k + 1)

export const PERIODS = [
    {
        title: "hour",
        dharmaUnit: DHARMA_AMORTIZATION_UNITS["HOURS"],
        value: RELAYER_AMORTIZATION_FREQUENCIES["HOURLY"],
    },
    {
        title: "day",
        dharmaUnit: DHARMA_AMORTIZATION_UNITS["DAYS"],
        value: RELAYER_AMORTIZATION_FREQUENCIES["DAILY"],
    },
    {
        title: "week",
        dharmaUnit: DHARMA_AMORTIZATION_UNITS["WEEKS"],
        value: RELAYER_AMORTIZATION_FREQUENCIES["WEEKLY"],
    },
    {
        title: "month",
        dharmaUnit: DHARMA_AMORTIZATION_UNITS["MONTHS"],
        value: RELAYER_AMORTIZATION_FREQUENCIES["MONTHLY"],
    },
    {
        title: "year",
        dharmaUnit: DHARMA_AMORTIZATION_UNITS["YEARS"],
        value: RELAYER_AMORTIZATION_FREQUENCIES["YEARLY"],
    },
]

export const DEFAULT_LOAN_REQUEST = {
    amortizationFrequency: "Hourly",
    amount: 0,
    collateralType: "REP",
    currency: "REP",
    interestRate: 0.01,
    term: 1
}

export const termValues = {
    1: { name: '1 day', amortizationFrequencies: [RELAYER_AMORTIZATION_FREQUENCIES.DAILY] },
    7: { name: '7 days', amortizationFrequencies: [RELAYER_AMORTIZATION_FREQUENCIES.DAILY] },
    28: { name: '28 days', amortizationFrequencies: [RELAYER_AMORTIZATION_FREQUENCIES.WEEKLY] },
    90: { name: '90 days', amortizationFrequencies: [RELAYER_AMORTIZATION_FREQUENCIES.MONTHLY] },
    180: { name: '180 days', amortizationFrequencies: [RELAYER_AMORTIZATION_FREQUENCIES.MONTHLY] },
    360: { name: '360 days', amortizationFrequencies: [RELAYER_AMORTIZATION_FREQUENCIES.MONTHLY] }
}