const { ethers, upgrades } = require('hardhat');
const fs = require('fs');
async function main() {
  const BNUGEvent = await ethers.getContractFactory('BNUGEvent');
  const bNUGEvent = await upgrades.deployProxy(BNUGEvent, ["https://ipfs.io/ipfs/QmS4eVEtY1Av8hWnPmuB4tyRZMKvGoffTg8BEZgLLxCT8y/event_metadata"], {
    initializer: 'initialize',
  });
  await bNUGEvent.deployed();
  console.log('Event deployed to:', bNUGEvent.address);
  fs.writeFileSync(process.env.MODE === 'prod' ? 'deployed_event_address' : 'dev_deployed_event_address', `${bNUGEvent.address}`, { encoding: 'utf-8' });

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
