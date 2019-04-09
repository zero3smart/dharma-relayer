export function convertToRelayer(plexDebtOrder) {
    return {
        kernelAddress: plexDebtOrder.kernelVersion,
        repaymentRouterAddress: plexDebtOrder.issuanceVersion,
        principalAmount: plexDebtOrder.principalAmount,
        principalTokenAddress: plexDebtOrder.principalToken,
        debtorAddress: plexDebtOrder.debtor,
        debtorFee: plexDebtOrder.debtorFee,
        termsContractAddress: plexDebtOrder.termsContract,
        termsContractParameters: plexDebtOrder.termsContractParameters,
        expirationTime: new Date(plexDebtOrder.expirationTimestampInSec * 1000).toISOString(),
        salt: plexDebtOrder.salt,
        debtorSignature: plexDebtOrder.debtorSignature,
        underwriterAddress: plexDebtOrder.underwriter,
        underwriterRiskRating: plexDebtOrder.underwriterRiskRating,
        underwriterFee: plexDebtOrder.underwriterFee,
        underwriterSignature: plexDebtOrder.underwriterSignature,
        relayerAddress: plexDebtOrder.relayer,
        relayerFee: plexDebtOrder.relayerFee,
        description: plexDebtOrder.description
    };
}
//
// JSON.stringify(convertToRelayer(
//   {
//     "kernelAddress": "0x02c1c8cc7e43c044d632b0c1cb017ae107a2b5c7",
//     "repaymentRouterAddress": "0x849c8f030fb0e83068890e04d3ac94e058212d43",
//     "principalAmount": 101000000000000000000,
//     "principalTokenAddress": "0xa46535643bc5fb4ad28093723803652924c8e396",
//     "debtorAddress": "0x001d51cdc8f4b378e136642ddb95dfc4ff6a4b72",
//     "debtorFee": 0,
//     "termsContractAddress": "0x04f962e11ca5e351d90cf8d3e004ed46d2e0813f",
//     "termsContractParameters": "0x010000000579a814e10a740000013d3020003000000000000000000000000000",
//     "expirationTime": "2018-05-03T18:19:03.000Z",
//     "salt": 0,
//     "debtorSignature": "\"{\\\"v\\\":27,\\\"r\\\":\\\"0xcff513a90df6a97e5dae57adbcbae7698982efd44a02ab18b8446f1d57de2c08\\\",\\\"s\\\":\\\"0x2f47b8a3ea174259d71b3ae4b42360569199a066fe722fb1d3717647907718c1\\\"}\"",
//     "underwriterAddress": "0x0000000000000000000000000000000000000000",
//     "underwriterRiskRating": 0,
//     "underwriterFee": 0,
//     "underwriterSignature": "\"{\\\"r\\\":\\\"\\\",\\\"s\\\":\\\"\\\",\\\"v\\\":0}\"",
//     "relayerAddress": "0x0000000000000000000000000000000000000000",
//     "relayerFee": 0,
//     "description": "test debt order"
//   }
// ))