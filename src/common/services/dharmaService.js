import Dharma from '@dharmaprotocol/dharma.js';
import web3, {getNetwork} from '../services/web3Service';
import promisify from 'tiny-promisify';
import BigNumber from 'bignumber.js';
import DebtRegistry from '../protocolJson2/DebtRegistry.json';
import DebtKernel from '../protocolJson2/DebtKernel.json';
import RepaymentRouter from '../protocolJson2/RepaymentRouter.json';
import TokenTransferProxy from '../protocolJson2/TokenTransferProxy.json';
import TokenRegistry from '../protocolJson2/TokenRegistry.json';
import DebtToken from '../protocolJson2/DebtToken.json';
import SimpleInterestTermsContract from '../protocolJson2/SimpleInterestTermsContract.json';
import TermsContractRegistry from '../protocolJson2/TermsContractRegistry.json';

let dharma = null;

async function instantiateDharma(){
  const networkId = await getNetwork();
  const accounts = await promisify(web3.eth.getAccounts)();
  if (!accounts.length) {
    throw new Error('ETH account not available');
  }
  let defaultAccount = accounts[0];

  console.log(DebtKernel.networks);
  console.log(RepaymentRouter.networks);
  console.log(TokenTransferProxy.networks);
  console.log(TokenRegistry.networks);
  console.log(DebtToken.networks);
  console.log(DebtRegistry.networks);
  //console.log(SimpleInterestTermsContract.networks);

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


export async function createDebtOrder(){

  if(!dharma){
    await instantiateDharma();
  }

  let debtOrder = {
    principalTokenSymbol: 'DAI',
    principalAmount: 22,
    interestRate: 2.5,
    amortizationUnit: 'weeks',
    termLength: 11
  };


  const tokenRegistry = await dharma.contracts.loadTokenRegistry();
  const principalToken = await tokenRegistry.getTokenAddress.callAsync(debtOrder.principalTokenSymbol);

  console.log(principalToken);

  const simpleInterestLoan = {
    principalToken,
    principalTokenSymbol: debtOrder.principalTokenSymbol,
    principalAmount: new BigNumber(debtOrder.principalAmount),
    interestRate: new BigNumber(debtOrder.interestRate),
    amortizationUnit: debtOrder.amortizationUnit,
    termLength: new BigNumber(debtOrder.termLength)
  };

  console.log(simpleInterestLoan);

  const dharmaDebtOrder = await dharma.adapters.simpleInterestLoan.toDebtOrder(simpleInterestLoan);
  console.log(dharmaDebtOrder);

  return dharmaDebtOrder;

  //dharmaDebtOrder.debtor = defaultAccount;

  // Set the token allowance to unlimited
  //await dharma.token.setUnlimitedProxyAllowanceAsync(dharmaDebtOrder.principalToken);
  //dharmaDebtOrder.debtorSignature = await dharma.sign.asDebtor(dharmaDebtOrder);
}


export async function fromDebtOrder(debtOrder){
  if(!dharma){
    await instantiateDharma();
  }

  let result = await dharma.adapters.simpleInterestLoan.fromDebtOrder(debtOrder);
  console.log(result);
  return result;
}
