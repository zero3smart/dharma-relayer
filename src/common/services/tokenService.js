import contract from 'truffle-contract';
import BigNumber from 'bignumber.js';
import DAI from '../tokenJson/DAI.json';
import MKR from '../tokenJson/MKR.json';
import REP from '../tokenJson/REP.json';
import ZRX from '../tokenJson/ZRX.json';
import * as currencyCodes from '../currencyCodes';
import web3Provider from './web3Service.js'
import * as dharmaService from './dharmaService.js'

export async function convertToHumanReadable(amount, tokenSymbol) {
    const decimals = await getTokenDecimals(tokenSymbol);
    const res = new BigNumber(amount || 0).mul('1e-' + decimals.toNumber())
    return res;
}

export async function convertFromHumanReadable(amount, tokenSymbol) {
    const decimals = await getTokenDecimals(tokenSymbol);
    const res = new BigNumber(amount || 0).mul('1e' + decimals.toNumber())
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

export function getTokenContractBySymbolAsync(symbol) {
    const TokenContract = contract(getTokenSource(symbol));
    TokenContract.setProvider(web3Provider);

    return TokenContract.deployed();
}

export async function getTokenBalanceAsync(symbol, ownerAddress) {
    let contract = await getTokenContractBySymbolAsync(symbol);
    let balance = await contract.balanceOf(ownerAddress);
    return convertToHumanReadable(balance, symbol);
}

export async function unlockTokenAsync(symbol, unlock) {
    const tokenAddress = await getTokenAddressBySymbolAsync(symbol)
    console.log('unlockTokenAsync called:', symbol, unlock)
    if (unlock) {
        await dharmaService.setUnlimitedProxyAllowanceAsync(tokenAddress);
    } else {
        await dharmaService.setProxyAllowanceAsync(tokenAddress, 0);
    }
}

export async function getTokenLockAsync(symbol) {
    const tokenAddress = await getTokenAddressBySymbolAsync(symbol)
    const allowance = await dharmaService.getProxyAllowanceAsync(tokenAddress)

    return allowance.greaterThan(0)
}

async function getTokenDecimals(symbol) {
    const token = await getTokenContractBySymbolAsync(symbol);

    return token.decimals();
}

function getTokenSource(token) {
    switch (token) {
        case currencyCodes.DAI:
            return DAI;
        case currencyCodes.MKR:
            return MKR;
        case currencyCodes.REP:
            return REP;
        case currencyCodes.ZRX:
            return ZRX;
        default:
            throw new Error(`Configuration for token ${token} wasn't found`);
    }
}