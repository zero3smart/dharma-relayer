import web3 from './web3Service';
import data from '../DummyToken.json';
import contract from 'truffle-contract';

export default async function(amount){
  var provider = web3.currentProvider;
  var MyContract = contract(data);
  MyContract.setProvider(provider);

  let deployedContract = await MyContract.deployed();

  let currentNetwork = await new Promise((resolve, reject) => {
    web3.version.getNetwork((err, netId) => {
      if(err){
        reject(err);
      }
      resolve(netId);
    });
  });
  //let spender = '0x16d32B7855654B71356a63135A886E7EF345d9f8';
  let spender = data.networks[currentNetwork].address;
  await deployedContract.approve(spender, amount);
}