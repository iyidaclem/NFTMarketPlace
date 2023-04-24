const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { utils } = require('ethers');
const { expect } = require('chai');
const { ethers, upgrades } = require('hardhat');
const { formatEther, parseUnits } = require('ethers/lib/utils');

const onlyOwnerMsg = 'Ownable: caller is not the owner';
const onlyAdminMsg = 'Only admin can call this';

describe('BNUG TOKEN CONTRACT', () => {
  async function fixtures() {
    const BNUGToken = await ethers.getContractFactory('BNUGToken');
    const bNUGToken = await upgrades.deployProxy(BNUGToken, [], { initializer: 'initialize' });
    const [owner, account2, account3] = await ethers.getSigners();
    return { BNUGToken, bNUGToken, owner, account2, account3 };
  }

  describe('BNUGToken', () => {
    it('Should deploy BNUGToken Correctly with name, symbol, inital supply and max_supply', async () => {
      const { bNUGToken } = await loadFixture(fixtures);
      expect(await bNUGToken.name()).to.equal('BNUGDAO');
      expect(await bNUGToken.symbol()).to.equal('BNUG');
      expect(await bNUGToken.totalSupply()).to.equal(parseUnits('1000000', 18));
      expect(await bNUGToken.maxSupply()).to.equal(parseUnits('10000000', 18));
    });
  });

  describe('Test Admin functions', () => {
    it('Should fail if not owner', async () => {
      const { account2, account3, bNUGToken } = await loadFixture(fixtures);
      await expect(bNUGToken.connect(account2).setAdmin(account3.address)).to.be.revertedWith(
        onlyOwnerMsg,
      );
    });

    it('Should check if the owner is an admin', async () => {
      const { owner, bNUGToken } = await loadFixture(fixtures);
      expect(await bNUGToken.isAdmin(owner.address)).to.equal(true);
    });

    it('Should set address to an admin and only admin can call it', async () => {
      const { account2, bNUGToken } = await loadFixture(fixtures);
      await bNUGToken.setAdmin(account2.address);
      expect(await bNUGToken.isAdmin(account2.address)).to.equal(true);
      await expect(bNUGToken.connect(account2).setAdmin(account2.address)).to.be.revertedWith(onlyOwnerMsg);
    });

    it('getAdmins() Should return list of admins and only admins can call it', async () => {
      const { owner, account2, bNUGToken } = await loadFixture(fixtures);
      const admins = await bNUGToken.getAdmins();
      expect(typeof admins).to.equal('object');
      expect(admins[0]).to.equal(owner.address);
      await expect(bNUGToken.connect(account2).getAdmins()).to.be.revertedWith(onlyAdminMsg);
    });

    it('Should allow only admin to call getAdmin(index) and returns at a given index', async () => {
      const { owner, account2, bNUGToken } = await loadFixture(fixtures);

      expect(await bNUGToken.getAdmin(0)).to.equal(owner.address);
      await expect(bNUGToken.connect(account2).getAdmin(0)).to.be.revertedWith(onlyAdminMsg);
    });

    it('Should allow only owner to remove admin', async () => {
      const { owner, account2, bNUGToken } = await loadFixture(fixtures);
      await bNUGToken.setAdmin(account2.address);
      expect(await bNUGToken.isAdmin(account2.address)).to.equal(true);
      await expect(bNUGToken.connect(account2).removeAdmin(account2.address)).to.be.revertedWith(onlyOwnerMsg);
      await bNUGToken.connect(owner).removeAdmin(account2.address);
      expect(await bNUGToken.isAdmin(account2.address)).to.equal(false);
    });

    it('Should allow admin renounce adminship', async () => {
      const { account3, bNUGToken } = await loadFixture(fixtures);
      await bNUGToken.setAdmin(account3.address);
      expect(await bNUGToken.isAdmin(account3.address)).to.equal(true);
      await bNUGToken.connect(account3).renounceAdminship();
      expect(await bNUGToken.isAdmin(account3.address)).to.equal(false);
    });
  });

  describe('Test Minting function', () => {
    it('Should fail if not admin', async () => {
      const { account2, bNUGToken } = await loadFixture(fixtures);
      bNUGToken.connect(account2);
      expect(bNUGToken.mintCommunityToken(account2.address, parseUnits('1000', 18))).to.be.revertedWith(
        onlyAdminMsg,
      );
    });

    it('should mint new token into a specified address', async () => {
      const { owner, account2, bNUGToken } = await loadFixture(fixtures);
      const account2Bal = utils.formatEther(await bNUGToken.balanceOf(account2.address));
      await bNUGToken.mintCommunityToken(account2.address, parseUnits('1000', 18));

      expect(bNUGToken.mintCommunityToken(owner.address, parseUnits('10000000', 18))).to.be.revertedWith(
        'Total supply cannot exceeed maximum supply',
      );
      expect(Number(utils.formatEther(await bNUGToken.balanceOf(account2.address)))).to.equal(2000);
      expect(Number(utils.formatEther(parseUnits('1000000', 18)))).to.be.lessThan(Number(formatEther(await bNUGToken.totalSupply())));
    });
  });

  describe('Test Burning function', () => {
    it('Should fail if not admin', async () => {
      const { owner, account2, bNUGToken } = await loadFixture(fixtures);
      expect(bNUGToken.connect(account2).burnToken(owner.address, '1000000000000000000000')).to.be.revertedWith(
        onlyAdminMsg,
      );
    });

    it('should burn token from a specified address', async () => {
      const { owner, bNUGToken } = await loadFixture(fixtures);
      const ownerBal = utils.formatEther(await bNUGToken.balanceOf(owner.address));

      await bNUGToken.burnToken(owner.address, parseUnits('1000', 18));
      expect(Number(utils.formatEther(await bNUGToken.balanceOf(owner.address))).toString()).to.equal((Number(ownerBal) - 1000).toString());
      expect(Number(utils.formatEther(await bNUGToken.totalSupply()))).to.equal(1000000 - 1000);
      expect(Number(utils.formatEther(parseUnits('1000000', 18)))).to.be.greaterThan(Number(formatEther(await bNUGToken.totalSupply())));
    });
  });
});
