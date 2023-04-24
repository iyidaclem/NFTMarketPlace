const { ethers, upgrades } = require('hardhat');
const fs = require('fs');

const tokenAddress = fs.readFileSync('deployed_token_address').toString().trim();

async function main() {
  const NFTMarketplace = await ethers.getContractFactory('NFTMarketplace');
  const nftMarketplace = await upgrades.deployProxy(NFTMarketplace, [tokenAddress], {
    initializer: 'intialize',
  });
  await nftMarketplace.deployed();

  console.log('Market deployed to:', nftMarketplace.address);
  fs.writeFileSync('deployed_nft_address', `${nftMarketplace.address}`, { encoding: 'utf-8' });

  const BNUGToken = await ethers.getContractAt('BNUGToken', tokenAddress);
  await BNUGToken.setAdmin(nftMarketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
