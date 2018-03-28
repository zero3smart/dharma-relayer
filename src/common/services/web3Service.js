import Web3 from 'web3';

if (typeof window.web3 !== 'undefined') {
  let defaultAccount = window.web3.eth.defaultAccount;
  window.web3 = new Web3(window.web3.currentProvider);
  window.web3.eth.defaultAccount = defaultAccount;
} else {
  alert('Metamask is not installed in your browser!');
}

export default window.web3;

export function getWalletBalance(){
  return new Promise((resolve, reject) => {
    resolve(new window.web3.BigNumber('1000'));
    //window.web3.eth.getBalance(window.web3.eth.defaultAccount, (err, balance) => {
    //  if(err){
    //    reject(err);
    //  }
    //  else{
    //    resolve(balance);
    //  }
    //});
  });
}
