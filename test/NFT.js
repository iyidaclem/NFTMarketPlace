const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { utils } = require('ethers');
const { expect } = require('chai');
const { ethers, upgrades } = require('hardhat');
const { parseEther, formatEther } = require('ethers/lib/utils');

describe('NFT MARKET PLACE TESTS', () => {
  async function fixtures() {
    const BNUGToken = await ethers.getContractFactory('BNUGToken');
    const bNUGToken = await upgrades.deployProxy(BNUGToken, [], { initializer: 'initialize' });
    await bNUGToken.deployed();
    const [owner, account2, account3] = await ethers.getSigners();
    const listingPrice = '0.025';
    const nftImageUrl = 'https://cdn.pixabay.com/photo/2022/02/18/16/09/ape-7020995_1280.png';

    const NFTMarketPlace = await ethers.getContractFactory('NFTMarketplace');
    const nFTMarketPlace = await upgrades.deployProxy(NFTMarketPlace, [bNUGToken.address], { initializer: 'initialize' });

    await bNUGToken.setAdmin(nFTMarketPlace.address);

    return {
      bNUGToken,
      owner,
      account2,
      account3,
      nFTMarketPlace,
      nftImageUrl,
      listingPrice,
    };
  }

  describe('Test NFTMARKET DEPLOYMENT', () => {
    it('Should deploy the NFTMarketPlace contract with correct name and symbol', async () => {
      const { nFTMarketPlace } = await loadFixture(fixtures);
      expect(await nFTMarketPlace.name()).to.equal('Negritude');
      expect(await nFTMarketPlace.symbol()).to.equal('NEG');
    });

    it('Should return the correct initial Listing price', async () => {
      const { nFTMarketPlace } = await loadFixture(fixtures);
      expect(await nFTMarketPlace.getListingPrice()).to.equal(parseEther('0.025'));
    });

    it('Should return the correct minting reward', async () => {
      const { nFTMarketPlace } = await loadFixture(fixtures);
      expect(await nFTMarketPlace.getMintingReward()).to.equal(parseEther('10'));
    });
  });

  describe('Testing listing price and Its methods', () => {
    it('Should set the correct listing price', async () => {
      const { nFTMarketPlace } = await loadFixture(fixtures);
      await nFTMarketPlace.updateListingPrice(parseEther('2'));
      expect(await nFTMarketPlace.getListingPrice()).to.equal(parseEther('2'));
    });
  });

  describe('Testing of Token creating and its methods', () => {
    it('Should create a token and reward the creator', async () => {
      const { nFTMarketPlace, bNUGToken, account2, nftImageUrl } = await loadFixture(fixtures);
      await nFTMarketPlace.createToken(nftImageUrl, parseEther('0.3'), account2.address, {
        value: parseEther('0.025'),
      });
      expect(await nFTMarketPlace.ownerOf(1)).to.equal(nFTMarketPlace.address);
      expect(await nFTMarketPlace.tokenURI(1)).to.equal(nftImageUrl);
    });
  });
});
