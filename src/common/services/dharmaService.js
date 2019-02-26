import Dharma from '@dharmaprotocol/dharma.js';
import web3Provider, { getNetwork, getDefaultAccount } from '../services/web3Service';
import promisify from 'tiny-promisify';
import BigNumber from 'bignumber.js';
import DebtRegistry from '../protocolJson/DebtRegistry.json';
import DebtKernel from '../protocolJson/DebtKernel.json';
import RepaymentRouter from '../protocolJson/RepaymentRouter.json';
import TokenTransferProxy from '../protocolJson/TokenTransferProxy.json';
import TokenRegistry from '../protocolJson/TokenRegistry.json';
import DebtToken from '../protocolJson/DebtToken.json';
import SimpleInterestTermsContract from '../protocolJson/SimpleInterestTermsContract.json';
import { RELAYER_ADDRESS, RELAYER_FEE, SUPPORTED_TOKENS } from '../api/config.js';
import { convertFromHumanReadable, convertToHumanReadable } from './tokenService.js';

const dharma = new Dharma(web3Provider);

export async function createDebtOrder(debtOrderInfo) {
  const tokenRegistry = await dharma.contracts.loadTokenRegistry();
  const principalTokenAddress = await tokenRegistry.getTokenAddressBySymbol.callAsync(debtOrderInfo.principalTokenSymbol);
  const amount = await convertFromHumanReadable(debtOrderInfo.principalAmount, debtOrderInfo.principalTokenSymbol);

  const simpleInterestLoan = {
    ...defaultDebtOrderParams,
    principalTokenAddress,
    principalTokenSymbol: debtOrderInfo.principalTokenSymbol,
    principalAmount: amount,
    interestRate: new BigNumber(debtOrderInfo.interestRate),
    amortizationUnit: debtOrderInfo.amortizationUnit,
    termLength: new BigNumber(debtOrderInfo.termLength),
    debtor: getDefaultAccount(),
    debtorFee: new BigNumber(0),
    creditorFee: new BigNumber(0),
    salt: BigNumber.random().mul('1e9').floor()
  };

  const dharmaDebtOrder = await dharma.adapters.simpleInterestLoan.toDebtOrder(simpleInterestLoan);
  dharmaDebtOrder.debtorSignature = await dharma.sign.asDebtor(dharmaDebtOrder, true);

  console.log(`Dharma debt order: ${JSON.stringify(dharmaDebtOrder)}`);
  const result = {
    kernelAddress: (await dharma.contracts.loadDebtKernelAsync()).address,
    repaymentRouterAddress: (await dharma.contracts.loadRepaymentRouterAsync()).address,
    creditorFee: dharmaDebtOrder.creditorFee.toString(),
    debtorFee: dharmaDebtOrder.debtorFee.toString(),
    principalAmount: dharmaDebtOrder.principalAmount.toString(),
    principalTokenAddress: dharmaDebtOrder.principalToken,
    debtorAddress: dharmaDebtOrder.debtor,
    creditorAddress: dharmaDebtOrder.creditor,
    termsContractAddress: dharmaDebtOrder.termsContract,
    termsContractParameters: dharmaDebtOrder.termsContractParameters,
    expirationTime: new Date(dharmaDebtOrder.expirationTimestampInSec.toNumber() * 1000).toISOString(),
    salt: dharmaDebtOrder.salt.toString(),
    debtorSignature: JSON.stringify(dharmaDebtOrder.debtorSignature),
    underwriterAddress: dharmaDebtOrder.underwriter,
    underwriterRiskRating: dharmaDebtOrder.underwriterRiskRating,
    underwriterFee: dharmaDebtOrder.underwriterFee,
    underwriterSignature: JSON.stringify(dharmaDebtOrder.underwriterSignature),
    relayerAddress: dharmaDebtOrder.relayer,
    relayerFee: dharmaDebtOrder.relayerFee
  };

  return result;
}

export async function fromDebtOrder(debtOrder) {
  try {
    const dharmaDebtOrder = {
      kernelVersion: debtOrder.kernelAddress,
      issuanceVersion: debtOrder.repaymentRouterAddress,
      principalAmount: new BigNumber(debtOrder.principalAmount || 0),
      principalToken: debtOrder.principalTokenAddress,
      debtor: debtOrder.debtorAddress,
      debtorFee: debtOrder.debtorFee && new BigNumber(debtOrder.debtorFee || 0),
      termsContract: debtOrder.termsContractAddress,
      termsContractParameters: debtOrder.termsContractParameters,
      expirationTimestampInSec: new BigNumber(new Date(debtOrder.expirationTime).getTime() / 1000),
      salt: new BigNumber(debtOrder.salt || 0),
      debtorSignature: debtOrder.debtorSignature ? JSON.parse(debtOrder.debtorSignature) : null,
      relayer: debtOrder.relayerAddress,
      relayerFee: new BigNumber(debtOrder.relayerFee || 0),
      underwriter: debtOrder.underwriterAddress || defaultDebtOrderParams.underwriter,
      underwriterRiskRating: new BigNumber(debtOrder.underwriterRiskRating || defaultDebtOrderParams.underwriterRiskRating),
      underwriterFee: new BigNumber(debtOrder.underwriterFee || defaultDebtOrderParams.underwriterFee),
      underwriterSignature: debtOrder.underwriterSignature ? JSON.parse(debtOrder.underwriterSignature) : defaultDebtOrderParams.underwriterSignature,
    };

    dharmaDebtOrder.originalDebtOrder = Object.assign({}, dharmaDebtOrder)

    const simpleInterestDebtOrder = await dharma.adapters.simpleInterestLoan.fromDebtOrder(dharmaDebtOrder);
    simpleInterestDebtOrder.principalAmount = await convertToHumanReadable(simpleInterestDebtOrder.principalAmount, simpleInterestDebtOrder.principalTokenSymbol);

    return simpleInterestDebtOrder;
  } catch (e) {
    console.error(e)
    return null;
  }
}

export async function fillDebtOrder(debtOrder) {
  const creditor = getDefaultAccount();
  const originalDebtOrder = debtOrder.dharmaDebtOrder.originalDebtOrder;

  originalDebtOrder.creditor = creditor;

  console.log(JSON.stringify(originalDebtOrder));
  const txHash = await dharma.order.fillAsync(originalDebtOrder, { from: creditor });
  const receipt = await dharma.blockchain.awaitTransactionMinedAsync(txHash, 1000, 60000);

  debtOrder.txHash = txHash;

  console.log(receipt);

  return debtOrder;
}

export async function setUnlimitedProxyAllowanceAsync(tokenAddress) {
  const tx = await dharma.token.setUnlimitedProxyAllowanceAsync(
    tokenAddress,
    { from: getDefaultAccount() }
  );
  await dharma.blockchain.awaitTransactionMinedAsync(tx, 1000, 60000);
}

export async function setProxyAllowanceAsync(tokenAddress, allowance) {
  const tx = await dharma.token.setProxyAllowanceAsync(
    tokenAddress,
    allowance,
    { from: getDefaultAccount() }
  );

  await dharma.blockchain.awaitTransactionMinedAsync(tx, 1000, 60000);
}

export function getProxyAllowanceAsync(tokenAddress) {
  return dharma.token.getProxyAllowanceAsync(tokenAddress, getDefaultAccount());
}

export async function getSupportedTokens() {
  const res = {};
  for (const i in SUPPORTED_TOKENS) {
    const symbol = SUPPORTED_TOKENS[i];
    const address = await dharma.contracts.getTokenAddressBySymbolAsync(symbol);
    res[symbol] = address;
  }
  console.log('Supported tokens: ' + JSON.stringify(res))
  return res;
}

const defaultDebtOrderParams = {
  relayer: RELAYER_ADDRESS,
  relayerFee: RELAYER_FEE,
  underwriter: '0x0000000000000000000000000000000000000000',
  underwriterRiskRating: new BigNumber(0),
  underwriterFee: new BigNumber(0),
  underwriterSignature: {
    "r": "",
    "s": "",
    "v": 0
  },
}