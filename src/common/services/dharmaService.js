import Dharma from '@dharmaprotocol/dharma.js';
import web3, { getNetwork } from '../services/web3Service';
import promisify from 'tiny-promisify';
import BigNumber from 'bignumber.js';
import DebtRegistry from '../protocolJson/DebtRegistry.json';
import DebtKernel from '../protocolJson/DebtKernel.json';
import RepaymentRouter from '../protocolJson/RepaymentRouter.json';
import TokenTransferProxy from '../protocolJson/TokenTransferProxy.json';
import TokenRegistry from '../protocolJson/TokenRegistry.json';
import DebtToken from '../protocolJson/DebtToken.json';
import SimpleInterestTermsContract from '../protocolJson/SimpleInterestTermsContract.json';

let dharma = null;
let defaultAccount = null;

async function instantiateDharma() {
  const networkId = await getNetwork();
  const accounts = await promisify(web3.eth.getAccounts)();
  if (!accounts.length) {
    throw new Error('ETH account not available');
  }
  defaultAccount = accounts[0];

  if (!(networkId in DebtKernel.networks &&
    networkId in RepaymentRouter.networks &&
    networkId in TokenTransferProxy.networks &&
    networkId in TokenRegistry.networks &&
    networkId in DebtToken.networks &&
    networkId in SimpleInterestTermsContract.networks &&
    networkId in DebtRegistry.networks)) {
    throw new Error('Unable to connect to the blockchain');
  }

  const dharmaConfig = {
    kernelAddress: DebtKernel.networks[networkId].address,
    repaymentRouterAddress: RepaymentRouter.networks[networkId].address,
    tokenTransferProxyAddress: TokenTransferProxy.networks[networkId].address,
    tokenRegistryAddress: TokenRegistry.networks[networkId].address,
    debtTokenAddress: DebtToken.networks[networkId].address,
    simpleInterestTermsContractAddress: SimpleInterestTermsContract.networks[networkId].address,
    debtRegistryAddress: DebtRegistry.networks[networkId].address
  };

  return new Dharma(web3.currentProvider, dharmaConfig);
}

export async function createDebtOrder(debtOrderInfo) {

  if (!dharma) {
    dharma = await instantiateDharma();
  }

  const tokenRegistry = await dharma.contracts.loadTokenRegistry();
  const principalToken = await tokenRegistry.getTokenAddressBySymbol.callAsync(debtOrderInfo.principalTokenSymbol);

  const simpleInterestLoan = {
    principalToken,
    principalTokenSymbol: debtOrderInfo.principalTokenSymbol,
    principalAmount: new BigNumber(debtOrderInfo.principalAmount),
    interestRate: new BigNumber(debtOrderInfo.interestRate),
    amortizationUnit: debtOrderInfo.amortizationUnit,
    termLength: new BigNumber(debtOrderInfo.termLength),
    debtor: defaultAccount,
    debtorFee: new BigNumber(1),
    creditorFee: new BigNumber(0),
  };

  const dharmaDebtOrder = await dharma.adapters.simpleInterestLoan.toDebtOrder(simpleInterestLoan);
  dharmaDebtOrder.debtorSignature = await dharma.sign.asDebtor(dharmaDebtOrder);

  console.log(`Dharma debt order: ${dharmaDebtOrder}`);
  let result = {
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
    debtorSignature: JSON.stringify(dharmaDebtOrder.debtorSignature)
  };

  return result;
}

export async function fromDebtOrder(debtOrder) {
  if (!dharma) {
    dharma = await instantiateDharma();
  }

  try {
    JSON.parse(debtOrder.debtorSignature)
  } catch (e) {
    throw 'not valid JSON'
  }

  let dharmaDebtOrder = {
    kernelVersion: debtOrder.kernelAddress,
    issuanceVersion: debtOrder.repaymentRouterAddress,
    principalAmount: debtOrder.principalAmount && new BigNumber(debtOrder.principalAmount),
    principalToken: debtOrder.principalTokenAddress,
    debtor: debtOrder.debtorAddress,
    debtorFee: debtOrder.debtorFee && new BigNumber(debtOrder.debtorFee),
    termsContract: debtOrder.termsContractAddress,
    termsContractParameters: debtOrder.termsContractParameters,
    expirationTimestampInSec: new BigNumber(new Date(debtOrder.expirationTime).getTime() / 1000),
    salt: new BigNumber(debtOrder.salt),
    debtorSignature: JSON.parse(debtOrder.debtorSignature),
    relayer: debtOrder.relayerAddress,
    relayerFee: new BigNumber(debtOrder.relayerFee)
  };

  return await dharma.adapters.simpleInterestLoan.fromDebtOrder(dharmaDebtOrder);
}

export async function fillDebtOrder(debtOrder) {
  if (!dharma) {
    dharma = await instantiateDharma();
  }

  const accounts = await promisify(web3.eth.getAccounts)();
  const creditor = accounts[0];

  let tx = await dharma.token.setUnlimitedProxyAllowanceAsync(debtOrder.principalTokenAddress);
  await dharma.blockchain.awaitTransactionMinedAsync(tx, 1000, 60000);

  debtOrder.dharmaDebtOrder.creditor = creditor;

  console.log(debtOrder.dharmaDebtOrder);
  console.log(JSON.stringify(debtOrder.dharmaDebtOrder));
  const txHash = await dharma.order.fillAsync(debtOrder.dharmaDebtOrder, { from: creditor });
  const receipt = await dharma.blockchain.awaitTransactionMinedAsync(txHash, 1000, 60000);

  debtOrder.txHash = txHash;

  console.log(receipt);

  return debtOrder;

}