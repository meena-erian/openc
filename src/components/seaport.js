import * as Web3 from 'web3';
import { OpenSeaPort, Network } from 'opensea-js';

//const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/b53615829536489bb1907da4b0b45aae');
//const provider = new Web3.providers.HttpProvider('http://192.168.0.185:8545');
const provider = new Web3.providers.HttpProvider('https://opensea-rpc.portacode.mywire.org');

const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
  apiBaseUrl: 'https://rinkeby-api.opensea.io',
  //apiKey: 
});

export default seaport;