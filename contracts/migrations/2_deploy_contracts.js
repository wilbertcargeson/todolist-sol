const Account = artifacts.require("../contracts/Account.sol");
const ToDo = artifacts.require("../contracts/ToDo.sol");

module.exports = function (deployer) {
  deployer.deploy(Account);
  deployer.deploy(ToDo);
};
