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