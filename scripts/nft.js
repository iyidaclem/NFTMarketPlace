const { ethers, upgrades } = require('hardhat');
const fs = require('fs');
require('dotenv').config()

const tokenAddress = fs.readFileSync(process.env.MODE === 'prod'  ? 'deployed_token_address' : 'dev_deployed_token_address').toString().trim();

async function main() {
  const NFTMarketplace = await ethers.getContractFactory('NFTMarketplace');
  const nftMarketplace = await upgrades.deployProxy(NFTMarketplace, [tokenAddress], {
    initializer: 'initialize',
  });
  await nftMarketplace.deployed();

  console.log('Market deployed to:', nftMarketplace.address);
  fs.writeFileSync(process.env.MODE === 'prod'  ? 'deployed_nft_address' : 'dev_deployed_nft_address', `${nftMarketplace.address}`, { encoding: 'utf-8' });

  const BNUGToken = await ethers.getContractAt('BNUGToken', tokenAddress);
  await BNUGToken.setAdmin(nftMarketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
