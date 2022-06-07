const ReceiverEth = artifacts.require("./ReceiverEth.sol");

module.exports = function (deployer) {
  deployer.deploy(ReceiverEth);
};