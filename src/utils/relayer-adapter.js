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