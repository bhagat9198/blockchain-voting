const path = require("path");
const Wallet = require('ethereumjs-wallet');
const EthUtil = require('ethereumjs-util');
const Web3 = require("web3");
const HDWalletProvider = require('@truffle/hdwallet-provider');

// const rinkebyPrivateKey = new Buffer('7e6534909585ae6dc2dc224e964f844eebab54d1b24dcaf239be4015d67d5282', 'hex')
// const rinkebyWallet = Wallet['default'].fromPrivateKey(rinkebyPrivateKey);
// const rinkebyProvider = new WalletProvider(rinkebyWallet, "https://rinkeby.infura.io/")
const mnemonic = `merit scare sting family response curve shadow wealth liquid fatigue hungry cancel`;
const web3 = new Web3();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  // contracts_build_directory: path.join(__dirname, "ethereum/build"),
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  migrations_directory: path.join(__dirname, "ethereum/migrations"),
  contracts_directory: path.join(__dirname, "ethereum/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "5777" // Match any network id
    },
    // rinkeby: {
    //   // provider: rinkebyProvider,
    //   provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/c64e8156bf38401fa2240c5fc203e912`),
    //   network_id: 4,       // Rinkeby's id
    //   gas: 8500000,
    //   gasPrice: 1000000000,  // 1 gwei (in wei) (default: 100 gwei)
    //   confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true,
    //   port: 3000,
    // }
  },
  compilers: {
    solc: {
      version: "^0.8.10"
    }
  }
};
