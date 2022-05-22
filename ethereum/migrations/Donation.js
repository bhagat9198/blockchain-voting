const SendEther = artifacts.require("./../SendEther.sol");
const EthReceiver = artifacts.require("./../EthReceiver.sol");

module.exports = function (deployer) {
  deployer.deploy(SendEther);
};

module.exports = function (deployer) {
  deployer.deploy(EthReceiver);
};