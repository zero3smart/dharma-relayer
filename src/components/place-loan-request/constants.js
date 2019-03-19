import { RELAYER_AMORTIZATION_FREQUENCIES } from "../../common/amortizationFrequencies";

export const DAYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
    "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26",
    "27", "28", "29", "30"]

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