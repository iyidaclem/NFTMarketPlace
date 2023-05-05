const { ethers, upgrades } = require('hardhat');
const fs = require('fs');

async function main() {
  const BNUGEvent = await ethers.getContractFactory('BNUGEvent');
  const bNUGEvent = await upgrades.deployProxy(BNUGEvent, [], {
    initializer: 'initialize',
  });
  await bNUGEvent.deployed();

  console.log('Event deployed to:', bNUGEvent.address);
  fs.writeFileSync('deployed_event_address', `${bNUGEvent.address}`, { encoding: 'utf-8' });

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
