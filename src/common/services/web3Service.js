import Web3 from 'web3';

if (typeof window.web3 !== 'undefined') {
  let defaultAccount = window.web3.eth.defaultAccount;
  window.web3 = new Web3(window.web3.currentProvider);
  window.web3.eth.defaultAccount = defaultAccount;
} else {
  alert('Metamask is not installed in your browser!');
}

export default window.web3;
