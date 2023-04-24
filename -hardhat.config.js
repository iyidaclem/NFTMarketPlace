const fs = require('fs');

require('hardhat-celo');

const privateKey = fs.readFileSync('.secret').toString().trim();
const celoscanApiKey = fs.readFileSync('.celoscan_api_key').toString().trim();

// module.exports = {
//   networks: {
//     hardhat: {
//       chainId: 1337,
//     },
//     mumbai: {
//       url: 'https://rpc-mumbai.maticvigil.com',
//       accounts: [privateKey],
//     },
//     tbnb: {
//       url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
//       accounts: [privateKey],
//     },

//   },
//   solidity: '0.8.4',
// };

// require('@nomiclabs/hardhat-waffle');
// require('dotenv').config({ path: '.env' });
// require('hardhat-deploy');

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

// // Prints the Celo accounts associated with the mnemonic in .env
// task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'alfajores',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:7545',
    },
    alfajores: {
      url: 'https://alfajores-forno.celo-testnet.org',
      accounts: [privateKey],
      chainId: 44787,
    },
    celo: {
      url: 'https://forno.celo.org',
      accounts: [privateKey],
      chainId: 42220,
    },
    celoscan: {
      apiKey: {
        alfajores: `${celoscanApiKey}`,
      },
      url: '',
    },
  },
  solidity: '0.8.4',
};
