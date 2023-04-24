import React from 'react';
import Image from 'next/image';
import { Banner } from '../components';
import images from '../assets';

const HowItWorks = () => (
  <div className="flex flex-col items-center mx-10 py-20">
    <Banner
      name={(<> <h1>How it Works</h1></>)}
      childStyles="md:text-4xl sm:text-4xl xs:text-4xl text-left text-center"
      parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
    />

    <div className="flex flex-col md:flex-col justify-between md:items-center w-11/12 max-w-6xl">
      <div className="flex-1 mb-10 md:mb-0 mt-3 md:mr-10">
        <h3 className="text-2xl font-bold mb-5">Connect Your Wallet</h3>
        <p className="text-lg mb-5">
          To earn BNUG token, you need to connect your crypto wallet to our platform. We support MetaMask, wallet connect, and other popular wallets.
        </p>
        <Image
          className="w-5/12"
          src={images.connectBanner}
          alt="Connect your wallet"
        />
      </div>
      <div className="flex-1 mb-10 md:mb-0 md:mr-10">
        <h3 className="text-2xl font-bold mb-5">Mint NFT</h3>
        <p className="text-lg mb-5">
          Once you have connected your wallet, you can mint your own NFTs on BNUGDAO. You can upload your own artwork and set the price.
        </p>
        <Image
          src={images.createnft}
          alt="Mint NFT"
        />
      </div>
      <div className="flex-1 mb-10 md:mb-0 md:mr-10">
        <h3 className="text-2xl font-bold mb-5">Get BNUG Token Reward</h3>
        <p className="text-lg mb-5">
          Every time you mint an NFT on BNUGDAO, you will receive a reward in BNUG tokens. You can use these tokens to buy other NFTs on the platform, or hold onto them as an investment.
        </p>
        <Image
          src={images.bnugreward}
          alt="Get BNUG Token Reward"
        />
      </div>

      <div className="flex-1 mb-10 md:mb-0">
        <h3 className="text-2xl font-bold mb-5">Get Paid When Someone Buys It</h3>
        <p className="text-lg mb-5">
          When someone buys your NFT on BNUGDAO, the payment will be sent directly to your connected wallet. You can withdraw your earnings at any time, and use them to buy other NFTs on the platform, or exchange them for other cryptocurrencies.
        </p>
      </div>
    </div>
  </div>
);

export default HowItWorks;
