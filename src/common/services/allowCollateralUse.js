import {
  getNetworkAsync,
  getDefaultAccount
} from './web3Service';
import {
  getTokenContractBySymbolAsync
} from './tokenService'

export default async function (amount, token) {

  const currentNetwork = await getNetworkAsync();
  const tokenContract = await getTokenContractBySymbolAsync(token)
  const spender = tokenContract.address

  await tokenContract.approve(spender, amount, {
    from: getDefaultAccount()
  });
}