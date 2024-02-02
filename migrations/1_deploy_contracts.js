// migrations/1_deploy_contracts.js
const DujeToken = artifacts.require("DujeToken");

module.exports = function (deployer) {
  // Parametri za konstruktor pametnog ugovora
  const name = "DujeToken";
  const symbol = "DUJE";
  const decimals = 18;
  const initialSupply = 1000000;

  // Deployanje pametnog ugovora
  deployer.deploy(DujeToken, name, symbol, decimals, initialSupply);
};
