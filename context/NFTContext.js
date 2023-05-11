import React, { useEffect, useState } from 'react';
import { ethers, utils } from 'ethers';
import axios from 'axios';
import { useWeb3Modal } from '@web3modal/react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { getAccount, fetchBalance } from '@wagmi/core';
import { useContract, useProvider, useSigner } from 'wagmi';
import { MarketAddress, MarketAddressABI, TokenAddress, TokenAddressABI, BNUGEventAddress, BNUGEventAddressABI, zeroAddress } from './constants';
import { imagePaths } from '../images';

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const nftCurrency = 'CELO';
  const [currentAccount, setCurrentAccount] = useState('');
  const [isLoadingNFT, setIsLoadingNFT] = useState(false);
  const appName = 'BNUGDAO';
  const [userData, setUserData] = useState(null);
  const [userReward, setUserReward] = useState(null);
  const [bnugBal, setBnugBal] = useState(0);
  const [celoBal, setCeloBal] = useState(0);
  const [creators, setCreators] = useState([]);
  const provider = useProvider();
  const account = getAccount();
  const { data: signer } = useSigner();
  const contract = useContract({
    address: MarketAddress,
    abi: MarketAddressABI,
    signerOrProvider: signer || provider,
  });

  const tokenContract = useContract({
    address: TokenAddress,
    abi: TokenAddressABI,
    signerOrProvider: signer || provider
  });

  const eventContract = useContract({
    address: BNUGEventAddress,
    abi: BNUGEventAddressABI,
    signerOrProvider: signer || provider
  });

  const { open } = useWeb3Modal();

  const fetchNFTs = async () => {
    setIsLoadingNFT(false);
    // const provider = new ethers.providers.JsonRpcProvider('https://alfajores-forno.celo-testnet.org');
    const data = await contract.fetchMarketItems();
    const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
      const tokenURI = await contract.tokenURI(tokenId);
      const { data: { image, name, description } } = await axios.get(tokenURI);
      const price = ethers.utils.formatUnits(unformattedPrice.toString(), 'ether');

      return { price, tokenId: tokenId.toNumber(), id: tokenId.toNumber(), seller, owner, image, name, description, tokenURI };
    }));

    return items;
  };

  const fetchMyNFTsOrCreatedNFTs = async (type) => {
    if (!signer) return;
    setIsLoadingNFT(false);

    // const web3Modal = new Web3Modal();
    // const connection = await web3Modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();

    // const contract = fetchContract(signer);
    const data = type === 'fetchItemsListed' ? await contract.fetchItemsListed() : await contract.fetchMyNFTs();

    const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
      const tokenURI = await contract.tokenURI(tokenId);
      const { data: { image, name, description } } = await axios.get(tokenURI);
      const price = ethers.utils.formatUnits(unformattedPrice.toString(), 'ether');

      return { price, tokenId: tokenId.toNumber(), seller, owner, image, name, description, tokenURI };
    }));

    return items;
  };

  const createSale = async (url, formInputPrice, isReselling, id) => {
    // const web3Modal = new Web3Modal();
    // const connection = await web3Modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice, 'ether');
    // const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();
    const addr = localStorage.getItem('ref_id');
    const transaction = !isReselling
      ? await contract.createToken(url, price, addr || zeroAddress, { value: listingPrice.toString() })
      : await contract.resellToken(id, price, { value: listingPrice.toString() });

    setIsLoadingNFT(true);
    await transaction.wait();
  };

  const getUser = async (address) => {
    try {
      const { 0: userD, 1: rewards } = await contract.getUser(address);
      const newUserD = {};
      newUserD.userId = ethers.BigNumber.from(userD.userId).toNumber();
      newUserD.avatar = userD.avatar;
      return [newUserD, rewards.map((e) => {
        const newData = {};
        newData.amount = ethers.utils.formatUnits(`${e.amount.toString()}`, 18);
        newData.from = e.from;
        newData.rewardType = e.rewardType;
        return newData;
      })];
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCreators = async (getBalances) => {
    // const web3Modal = new Web3Modal();
    // const connection = await web3Modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();
    // const contract = fetchContract(signer);
    const creators2 = await contract.getAllUser();
    const updatedCreator = await Promise.all(creators2.map(async (e) => {
      const { 0: userId, 1: userAddress, 2: avatar, 3: nftCount } = e;
      const newEl = {};
      newEl.userId = ethers.BigNumber.from(userId).toNumber();
      newEl.userAddress = userAddress;
      newEl.avatar = avatar;
      newEl.nftCount = ethers.BigNumber.from(nftCount).toNumber();
      const { 0: celo } = await getBalances(userAddress);
      newEl.celoBal = celo;
      return newEl;
    }));
    updatedCreator?.sort((a, b) => (a.nftCount < b.nftCount ? 1 : -1));
    setCreators(updatedCreator);
  };

  const buyNft = async (nft) => {
    // const web3Modal = new Web3Modal();
    // const connection = await web3Modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract(MarketAddress, MarketAddressABI, signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    const transaction = await contract.createMarketSale(nft.tokenId, { value: price });
    setIsLoadingNFT(true);
    await transaction.wait();
    setIsLoadingNFT(false);
  };

  const getBalances = async (address) => {
    // const web3Modal = new Web3Modal();
    // const connection = await web3Modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();

    const mycelo = await fetchBalance({
      address,
    });
    const mybnug = utils.formatEther(await tokenContract.balanceOf(address));
    return [mycelo?.formatted, mybnug];
  };

  const checkIfWalletIsConnect = async () => {
    if (account.address) {
      setCurrentAccount(account.address);
      setUserData(await getUser(account.address)[0]);
      setUserReward(await getUser(account.address)[1]);
      const { 0: celo, 1: bnug } = await getBalances(account.address);
      setCeloBal(Number(celo));
      setBnugBal(Number(bnug));
      getCreators(getBalances);
    } else {
      open();
      console.log('No accounts found');
    }
  };


  // BNUG EVENT TICKET FUNCTIONS

  const mintTicket = async (id, qty) => {
    setIsLoadingNFT(true)
  const mintPrice =  await eventContract.getFee(id).then(e => e * qty)
  try {
    await eventContract.mint(id, qty, {value: mintPrice.toString()})
  } catch (error) {
    throw "Failed"
  }
  finally   
  {
    setIsLoadingNFT(false)

  }
  }

  const getFee = async (id) =>
  {
    
  return  await eventContract.getFee(id).then(e => ethers.utils.formatEther(e));
  
  }

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);
  return (
    <NFTContext.Provider value={
      {
        nftCurrency,
        buyNft,
        createSale,
        fetchNFTs,
        fetchMyNFTsOrCreatedNFTs,
        currentAccount,
        isLoadingNFT,
        imagePaths,
        appName,
        userData,
        userReward,
        getUser,
        celoBal,
        bnugBal,
        creators,
        getBalances,
        signer,
        mintTicket,
        getFee
      }}>
      {children}
    </NFTContext.Provider>
  );
};
