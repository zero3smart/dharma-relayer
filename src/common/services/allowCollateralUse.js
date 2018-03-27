import web3 from './web3Service';
import data from '../DummyToken.json';
import contract from 'truffle-contract';

export default async function(spender, amount){
  var provider = web3.currentProvider;
  var MyContract = contract(data);
  MyContract.setProvider(provider);

  let deployedContract = await MyContract.deployed();
  let approveResult = await deployedContract.approve(spender, amount);
  //console.log('approveResult:', approveResult);
}