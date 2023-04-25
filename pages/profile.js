import { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { NFTContext } from '../context/NFTContext';
import { shortenAddress } from '../utils/shortenAddress';
import { Loader, NFTCard, SearchBar, Banner } from '../components';
import ReferralTable from '../components/ReferralBonus';

const Profile = () => {
  const {
    fetchMyNFTsOrCreatedNFTs,
    imagePaths,
    getUser,
    celoBal,
    bnugBal,
  } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSelect, setActiveSelect] = useState('Recently Added');
  const [userData, setuserData] = useState(null);
  const [userReward, setuserReward] = useState(null);
  const [copied, setCopied] = useState(false);
  const { address, isConnected } = useAccount();
  useEffect(() => {
    if (!isConnected) window.location.href = '/';
    fetchMyNFTsOrCreatedNFTs('fetchMyNFTs')
      .then((items) => {
        setNfts(items);
        setNftsCopy(items);
        setIsLoading(false);
      });
  }, []);

  useEffect(async () => {
    const sortedNfts = [...nfts];
    switch (activeSelect) {
      case 'Price (low to high)':
        setNfts(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case 'Price (high to low)':
        setNfts(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case 'Recently added':
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
    const { 0: uD, 1: uR } = await getUser(address);
    setuserData(uD);
    setuserReward(uR);
  }, [activeSelect]);

  const onHandleSearch = (value) => {
    const filteredNfts = nfts.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));

    if (filteredNfts.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNfts);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          name="Your Nifty NFTs"
          childStyles="text-center mb-4"
          parentStyle="h-80 justify-center"
        />

        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full">
            <Image src={imagePaths[userData ? userData.userId : 0]} className="rounded-full object-cover" objectFit="cover" />
          </div>

          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">Account Details</p>
          <div className="font-poppins dark:text-white text-nft-black-1 font-semibold text-center text-sm">
            <p className="">{shortenAddress(address)}</p>
            <p>{bnugBal.toFixed(2)} BNUG</p>
            <p>{celoBal.toFixed(2)} CELO</p>
          </div>
          <p className="font-poppins mt-5">Referral Link</p>
          <div className="flex flex-col mt-3">
            <div className="flexStart flex-row w-full">
              <div className="flexBetween md:w-full minlg:w-557 w-357 h-full dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 rounded-md">
                <input
                  onChange={() => null}
                  type="text"
                  disabled
                  placeholder="Your email"
                  className="h-full flex-1 w-full p-3 dark:bg-nft-black-1 bg-white px-4 rounded-md font-poppins dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none"
                  value={`https://bnug.xyz/?ref=${address}`}
                  onKeyUp={() => null}
                />
              </div>
              <div className="flex-initial h-full">
                <button
                  type="button"
                  className="nft-gradient h-full text-sm minlg:text-lg py-3 px-6 minlg:py-4 minlg:px-8 font-poppins font-semibold text-white rounded-md -ml-10"
                  onClick={() => {
                    alert(`https://bnug.xyz/?ref=${address}`);
                    navigator.clipboard.writeText(`https://bnug.xyz/?ref=${address}`);
                    setCopied(!copied);
                  }}
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(!isLoading && nfts.length === 0) ? (
        <div className="flexCenter flex-col  sm:p-4 p-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">No NFTs owned</h1>

          <div>
            <Link href="/">
              <button
                type="button"
                className="m-5 nft-gradient block h-full text-sm minlg:text-lg py-3 px-6 minlg:py-4 minlg:px-8 font-poppins font-semibold text-white rounded-md -ml-10"
              >Explore NFTS
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
            <SearchBar activeSelect={activeSelect} setActiveSelect={setActiveSelect} handleSearch={onHandleSearch} clearSearch={onClearSearch} />
          </div>
          <div className="mt-3 w-full flex flex-wrap">
            {nfts.map((nft) => <NFTCard key={`nft-${nft.tokenId}`} nft={nft} onProfilePage />)}
          </div>
        </div>
      )}
      {userReward && userReward.length > 0 && <ReferralTable data={userReward} />}
    </div>
  );
};

export default Profile;
