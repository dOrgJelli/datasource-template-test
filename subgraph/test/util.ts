process.env = {
  ethereum: 'http://127.0.0.1:8545',
  ipfs: '/ip4/127.0.0.1/tcp/5001',
  node_http: 'http://127.0.0.1:8000/subgraphs/name/dynamic-datasource-example',
  node_ws: 'http://127.0.0.1:8001/subgraphs/name/dynamic-datasource-example',
  test_mnemonic:
    'myth like bonus scare over problem client lizard pioneer submit female collect',
  ...process.env,
};

import * as HDWallet from 'hdwallet-accounts';
const Web3 = require('web3');

const { node_ws, node_http, ethereum, ipfs, test_mnemonic } = process.env;

export async function getWeb3() {
  const web3 = new Web3(ethereum);
  console.log("HERE");
  const hdwallet = HDWallet(10, test_mnemonic);
  Array(10)
    .fill(10)
    .map((_, i) => i)
    .forEach((i) => {
      const pk = hdwallet.accounts[i].privateKey;
      const account = web3.eth.accounts.privateKeyToAccount(pk);
      web3.eth.accounts.wallet.add(account);
    });
  console.log("NOHERE");
  web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address;
  return web3;
}

export async function getOptions(web3) {
  console.log("NOWHERE");
  return {
    from: web3.eth.defaultAccount,
    gas: 2000000,
  };
}
