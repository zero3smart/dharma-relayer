import web3, {getNetwork} from './web3Service';
//import data from '../DummyToken.json';
import DAI from '../tokenJson/DAI.json';
import MKR from '../tokenJson/MKR.json';
import REP from '../tokenJson/REP.json';
import ZRX from '../tokenJson/ZRX.json';
import * as currencyCodes from '../currencyCodes';

import contract from 'truffle-contract';

export default async function(amount, token){
  let provider = web3.currentProvider;
  let tokenSource = getTokenSource(token);
  if(!tokenSource){
    throw new Error(`Configuration for token ${token} wasn't found`);
  }

  let MyContract = contract(tokenSource);
  MyContract.setProvider(provider);
  let deployedContract = await MyContract.deployed();
  let currentNetwork = await getNetwork();

  let spender = tokenSource.networks[currentNetwork].address;
  await deployedContract.approve(spender, amount, {from: web3.eth.defaultAccount});
}

function getTokenSource(token){
  switch(token){
    case currencyCodes.DAI:
      return DAI;
    case currencyCodes.MKR:
      return MKR;
    case currencyCodes.REP:
      return REP;
    case currencyCodes.ZRX:
      return ZRX;
    default:
      return null;
  }
}