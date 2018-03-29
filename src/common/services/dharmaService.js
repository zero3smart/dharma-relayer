import Dharma from '@dharmaprotocol/dharma.js';
import web3, {getNetwork} from '../services/web3Service';
import promisify from 'tiny-promisify';
import BigNumber from 'bignumber.js';
import DebtRegistry from '../protocolJson/DebtRegistry.json';
import DebtKernel from '../protocolJson/DebtKernel.json';
import RepaymentRouter from '../protocolJson/RepaymentRouter.json';
import TokenTransferProxy from '../protocolJson/TokenTransferProxy.json';
import TokenRegistry from '../protocolJson/TokenRegistry.json';
import DebtToken from '../protocolJson/DebtToken.json';
import SimpleInterestTermsContract from '../protocolJson/SimpleInterestTermsContract.json';
import TermsContractRegistry from '../protocolJson/TermsContractRegistry.json';

let dharma = null;
let defaultAccount = null;

async function instantiateDharma(){
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
    networkId in DebtRegistry.networks
    //&& networkId in SimpleInterestTermsContract.networks
  )) {
    throw new Error('Unable to connect to the blockchain');
  }

  const dharmaConfig = {
    kernelAddress: DebtKernel.networks[networkId].address,
    repaymentRouterAddress: RepaymentRouter.networks[networkId].address,
    tokenTransferProxyAddress: TokenTransferProxy.networks[networkId].address,
    tokenRegistryAddress: TokenRegistry.networks[networkId].address,
    debtTokenAddress: DebtToken.networks[networkId].address,
    termsContractRegistry: TermsContractRegistry.networks[networkId].address,
    debtRegistryAddress: DebtRegistry.networks[networkId].address
  };

  dharma = new Dharma(web3.currentProvider, dharmaConfig);
}


//{
//  principalTokenSymbol: 'DAI',
//    principalAmount: 22,
//  interestRate: 2.5,
//  amortizationUnit: 'weeks',
//  termLength: 11
//}
export async function createDebtOrder(debtOrderInfo){

  if(!dharma){
    await instantiateDharma();
  }

  const tokenRegistry = await dharma.contracts.loadTokenRegistry();
  const principalToken = await tokenRegistry.getTokenAddressBySymbol.callAsync(debtOrderInfo.principalTokenSymbol);

  const simpleInterestLoan = {
    principalToken,
    principalTokenSymbol: debtOrderInfo.principalTokenSymbol,
    principalAmount: new BigNumber(debtOrderInfo.principalAmount),
    interestRate: new BigNumber(debtOrderInfo.interestRate),
    amortizationUnit: debtOrderInfo.amortizationUnit,
    termLength: new BigNumber(debtOrderInfo.termLength)
  };

  const dharmaDebtOrder = await dharma.adapters.simpleInterestLoan.toDebtOrder(simpleInterestLoan);

  dharmaDebtOrder.debtor = defaultAccount;
  // Set the token allowance to unlimited

  //let tx = await dharma.token.setUnlimitedProxyAllowanceAsync(principalToken);
  //await dharma.blockchain.awaitTransactionMinedAsync(tx, 1000, 60000);

  //const balance = await dharma.token.getBalanceAsync(principalToken, defaultAccount);
  //const allowance = await dharma.token.getBalanceAsync(principalToken, defaultAccount);

  //dharmaDebtOrder.underwriter = defaultAccount;
  //dharmaDebtOrder.underwriterFee = new BigNumber(1);
  //dharmaDebtOrder.underwriterRiskRating = new BigNumber(999);
  //dharmaDebtOrder.underwriterSignature = await dharma.sign.asUnderwriter(dharmaDebtOrder);

  // hardcoded
  //dharmaDebtOrder.relayer = defaultAccount;
  //dharmaDebtOrder.relayerFee = new BigNumber(2);

  dharmaDebtOrder.debtorFee = new BigNumber(1);
  dharmaDebtOrder.creditorFee = new BigNumber(0);
  dharmaDebtOrder.debtorSignature = await dharma.sign.asDebtor(dharmaDebtOrder);

  //dharmaDebtOrder.creditor = defaultAccount;
  //const txHash = await dharma.order.fillAsync(dharmaDebtOrder, {from: dharmaDebtOrder.creditor});
  //const receipt = await promisify(web3.eth.getTransactionReceipt)(txHash);

  //console.log(receipt);

  console.log(dharmaDebtOrder);
  let result =  {
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
    debtorSignature:web3.toHex(dharmaDebtOrder.debtorSignature)
  };

  console.log(result);
  return result;
}

export async function fromDebtOrder(debtOrder){
  if(!dharma){
    await instantiateDharma();
  }

  let mapped = {
    principalAmount: debtOrder.principalAmount && new BigNumber(debtOrder.principalAmount),
    principalToken: debtOrder.principalTokenAddress,
    debtor: debtOrder.debtorAddress,
    debtorFee: debtOrder.debtorFee && new BigNumber(debtOrder.debtorFee),
    //creditor: debtOrder.creditorAddress,
    //creditorFee: debtOrder.creditorFee && new BigNumber(debtOrder.creditorFee),
    relayer: debtOrder.relayerAddress,
    relayerFee: debtOrder.relayerFee && new BigNumber(debtOrder.relayerFee),
    termsContract: debtOrder.termsContractAddress,
    termsContractParameters: debtOrder.termsContractParameters,
    expirationTimestampInSec: new BigNumber((new Date(debtOrder.expirationTime).getTime()) / 1000)
  };

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
      debtorSignature: web3.fromAscii(debtOrder.debtorSignature),
      relayer: debtOrder.relayerAddress,
      relayerFee: new BigNumber(debtOrder.relayerFee)
  };

  return await dharma.adapters.simpleInterestLoan.fromDebtOrder(dharmaDebtOrder);
}
