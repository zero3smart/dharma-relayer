import contract from 'truffle-contract';
import BigNumber from 'bignumber.js';
import { abi as TOKEN_ABI } from '../tokenJson/token_abi.json';
import web3Provider from './web3Service.js';
import * as dharmaService from './dharmaService.js';

const supportedTokensPromise = dharmaService.getSupportedTokens();
const TokenContract = contract({
  abi: TOKEN_ABI
});
web3Provider && TokenContract.setProvider(web3Provider);

export async function convertToHumanReadable(amount, tokenSymbol) {
  const decimals = await getTokenDecimals(tokenSymbol);
  const res = new BigNumber(amount || 0).mul('1e-' + decimals)
  return res;
}

export async function convertFromHumanReadable(amount, tokenSymbol) {
  const decimals = await getTokenDecimals(tokenSymbol);
  const res = new BigNumber(amount || 0).mul('1e' + decimals)
  return res;
}

export async function getTokenAddressBySymbolAsync(symbol) {
  const contract = await getTokenContractBySymbolAsync(symbol)
  return contract.address;
}

export async function getTokenNameBySymbolAsync(symbol) {
  const contract = await getTokenContractBySymbolAsync(symbol)
  return contract.name();
}

export async function getTokenBalanceAsync(symbol, ownerAddress) {
  let contract = await getTokenContractBySymbolAsync(symbol);
  let balance = await contract.balanceOf(ownerAddress);
  return convertToHumanReadable(balance, symbol);
}

export async function principalTokenLockAsync(symbol, unlock) {
  const tokenAddress = await getTokenAddressBySymbolAsync(symbol)
  console.log('principalTokenLockAsync called:', symbol, unlock)
  if (unlock) {
    await dharmaService.setUnlimitedProxyAllowanceAsync(tokenAddress);
  } else {
    await dharmaService.setProxyAllowanceAsync(tokenAddress, 0);
  }
}

export async function getPrincipalTokenLockAsync(symbol) {
  const tokenAddress = await getTokenAddressBySymbolAsync(symbol)
  const allowance = await dharmaService.getProxyAllowanceAsync(tokenAddress)

  return allowance.greaterThan(0)
}

export async function unlockCollateralTokenAsync(symbol, amount, unlock) {
  console.log('unlockCollateralTokenAsync amount: ' + amount);
  if (amount && new BigNumber(amount).greaterThan(0)) {
    const tokenAddress = await getTokenAddressBySymbolAsync(symbol)
    //const rawAmount = await convertFromHumanReadable(amount, symbol);
    if (unlock) {
      await dharmaService.setUnlimitedProxyAllowanceAsync(tokenAddress);
      //await dharmaService.setProxyAllowanceAsync(tokenAddress, rawAmount);
    } else {
      await dharmaService.setProxyAllowanceAsync(tokenAddress, 0);
    }
  }
}

const cachedTokens = {};
async function getTokenContractBySymbolAsync(symbol) {
  if (symbol in (await supportedTokensPromise)) {
    if (symbol in cachedTokens) {
      return cachedTokens[symbol];
    }
    const token = await TokenContract.at((await supportedTokensPromise)[symbol]);
    cachedTokens[symbol] = token;

    return token;
  }
  return null;
}

const decimalsCache = {
  'REP':18,
  'ZRX':18,
  'MKR':18
};
async function getTokenDecimals(symbol) {
  if (symbol in decimalsCache) {
    return decimalsCache[symbol];
  }

  const token = await getTokenContractBySymbolAsync(symbol);
  const decimals = (await token.decimals()).toNumber();
  decimalsCache[symbol] = decimals;

  console.log(`getTokenDecimals cache miss: ${symbol}:${decimals}`)

  return decimals;
}