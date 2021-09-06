import { OpenSeaPort, Network } from 'opensea-js';
import RPCSubprovider from 'web3-provider-engine/subproviders/rpc';
import Web3ProviderEngine from 'web3-provider-engine';
const WalletSubprovider = require('@0x/subproviders');
const ACCOUNT_1_PK = process.env.REACT_APP_ACCOUNT_1_PK;
const ETH_RPC = process.env.REACT_APP_ETH_RPC;
const ETH_NETWORK_RINKEBY = process.env.REACT_APP_ETH_NETWORK_RINKEBY;
const OPENSEA_API_KEY = process.env.REACT_APP_OPENSEA_API_KEY;


function createSeaport(rpcUrl, privateKey, apiKey, rinkeby = false) {
  const rpcProvider = new RPCSubprovider({
          'rpcUrl': rpcUrl,
  });
  const wallet = new WalletSubprovider.PrivateKeyWalletSubprovider(privateKey);
  const providerEngine = new Web3ProviderEngine();
  providerEngine.addProvider(wallet);
  providerEngine.addProvider(rpcProvider);
  providerEngine.start();

  const seaport = new OpenSeaPort(providerEngine, {
    networkName: rinkeby? Network.Rinkeby : Network.Main,
    apiBaseUrl: rinkeby? 'https://rinkeby-api.opensea.io' : 'https://api.opensea.io',
    apiKey: apiKey
  }, console.log);
  return seaport;
}

const seaport = createSeaport(
  ETH_RPC,
  ACCOUNT_1_PK,
  OPENSEA_API_KEY,
  ETH_NETWORK_RINKEBY
);

export default seaport;