const { ethers, upgrades } = require('hardhat');
const fs = require('fs');

async function main() {
  const BNUGToken = await ethers.getContractFactory('BNUGToken');
  const bNUGToken = await upgrades.deployProxy(BNUGToken, [], {
    initializer: 'initialize',
  });
  await bNUGToken.deployed();

  console.log('Token deployed to:', bNUGToken.address);
  fs.writeFileSync('deployed_token_address', `${bNUGToken.address}`, { encoding: 'utf-8' });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
