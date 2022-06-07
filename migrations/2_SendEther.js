const SendEther = artifacts.require("./SendEther.sol");

module.exports = function (deployer) {
  deployer.deploy(SendEther);
};
