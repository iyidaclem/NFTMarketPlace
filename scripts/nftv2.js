const { ethers, upgrades } = require('hardhat');
const fs = require('fs');
require('dotenv').config()

const tokenAddress = fs.readFileSync(process.env.MODE === 'prod'  ? 'deployed_token_address' : 'dev_deployed_token_address').toString().trim();
const nftAddress = fs.readFileSync(process.env.MODE === 'prod'  ? 'deployed_nft_address' : 'dev_deployed_nft_address').toString().trim();

async function main() {
  const NFTMarketplaceV2 = await ethers.getContractFactory('NFTMarketplaceV2');
  const nftMarketplaceV2 = await upgrades.upgradeProxy(nftAddress, NFTMarketplaceV2);

  console.log('Market deployed to:', nftMarketplaceV2.address);
  const BNUGToken = await ethers.getContractAt('BNUGToken', tokenAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
