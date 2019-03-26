import { RELAYER_AMORTIZATION_FREQUENCIES } from "../../common/amortizationFrequencies";

export const DAYS = Array.from({ length: 30 }, (v, k) => k + 1)

export const PERIODS = [
    {
        title: "hour",
        value: RELAYER_AMORTIZATION_FREQUENCIES["HOURLY"],
    },
    {
        title: "day",
        value: RELAYER_AMORTIZATION_FREQUENCIES["DAILY"],
    },
    {
        title: "week",
        value: RELAYER_AMORTIZATION_FREQUENCIES["WEEKLY"],
    },
    {
        title: "month",
        value: RELAYER_AMORTIZATION_FREQUENCIES["MONTHLY"],
    },
    {
        title: "year",
        value: RELAYER_AMORTIZATION_FREQUENCIES["YEARLY"],
    },
]