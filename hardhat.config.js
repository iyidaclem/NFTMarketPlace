
const fs = require('fs');
require('hardhat-celo');
require('@openzeppelin/hardhat-upgrades');
require('@nomicfoundation/hardhat-chai-matchers');

const mnemonic = fs.readFileSync('.mnemonic').toString().trim();
const celoscanApiKey = fs.readFileSync('.celoscan_api_key').toString().trim();

module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    alfajores: {
      url: 'https://alfajores-forno.celo-testnet.org',
      accounts: {
        mnemonic,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
      chainId: 44787,
      count: 20,
    },
    celo: {
      url: 'https://forno.celo.org',
      accounts: {
        mnemonic,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
      chainId: 42220,
    },
    hardhat: {
      allowUnlimitedContractSize: true,
    },
  },
  etherscan: {
    apiKey: {
      alfajores: `${celoscanApiKey}`,
      celo: `${celoscanApiKey}`,
    },
    // url: 'https://alfajores.celoscan.io/',
    url: 'https://celoscan.io/',
  },
  // solidity: '0.8.4',

  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};
