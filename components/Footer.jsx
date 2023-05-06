import { useContext } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useAccount } from 'wagmi';

import Link from 'next/link';
import images from '../assets';
import { NFTContext } from '../context/NFTContext';
import Subscribe from './Subscribe';

const FooterLinks = ({ heading, items, extraClasses }) => {
  const { isConnected } = useAccount();
  return (
    <div className={`flex-1 justify-start items-start ${extraClasses}`}>
      <h3 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mb-10">{heading}</h3>
      {items.map((item, index) => <Link key={item + index} href={item[1]} className="font-Linkoppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3"><p className={`${item[0] === 'Swap Token' && !isConnected && 'hidden'}`}>{item[0]}</p></Link>)}
    </div>
  );
};

const Footer = () => {
  const { theme } = useTheme();
  const { appName } = useContext(NFTContext);

  return (
    <footer className="flexCenter flex-col border-t dark:border-nft-black-1 border-nft-gray-1 sm:py-8 py-16">
      <div className="w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16">
        <div className="flexStart flex-1 flex-col">
          <div className="flexCenter cursor-pointer">
            <Image className="rounded-full" src={images.logo02} objectFit="contain" width={32} height={32} alt="logo" />
            <p className=" dark:text-white text-nft-dark font-semibold text-lg ml-1">{appName}</p>
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base mt-6">Get the latest updates</p>
          <Subscribe />
        </div>

        <div className="flex-1 flexBetweenStart flex-wrap ml-10 md:ml-0 md:mt-8 cursor-pointer">
          <FooterLinks heading={appName} items={[['Explore', '/'], ['How it Works', '/how-it-works'], ['Contact Us', '/contact-us'], ['About Us', '/about'], ['Swap Token', '/swap-token'], ['Event Ticket', '/ticket']]} />
          <FooterLinks heading="Support" items={[['Follow us on Twitter', 'https://twitter.com/BlockchainNG'], ['Follow us on Instagram', 'https://www.instagram.com/blockchainnigeria/'], ['Follow us on Facebook', 'https://www.facebook.com/BlockchainNG'], ['Join us on Telegram', 'https://t.me/+T7VwGW-Ftwh60LhF'], ['Join BNUGDAO', ' https://snapshot.org/#/bnugdao.eth'], ['Drop us a mail', 'info@blockchainnigeria.group'],['BNUG Events', 'https://events.blockchainnigeria.group/']]} extraClasses="ml-4" />
        </div>
      </div>

      <div className="flexCenter w-full mt-5 border-t dark:border-nft-black-1 border-nft-gray-1 sm:px-4 px-16">
        <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">{appName} Community © {new Date().getFullYear()} All Rights Reserved. </p>
          <div className="flex flex-row sm:mt-4">
            <div>
              <Link href="https://www.instagram.com/blockchainnigeria/">
                <Image src={images.instagram} objectFit="contain" width={24} height={24} alt="social" className={theme === 'light' ? 'filter invert' : undefined} />
              </Link>
            </div>
            <div className="mx-2 cursor-pointer">
              <Link href="https://twitter.com/BlockchainNG">
                <Image src={images.twitter} objectFit="contain" width={24} height={24} alt="social" className={theme === 'light' ? 'filter invert' : undefined} />
              </Link>
            </div>
            <div className="mx-2 cursor-pointer">
              <Link href="https://t.me/+T7VwGW-Ftwh60LhF">
                <Image src={images.telegram} objectFit="contain" width={24} height={24} alt="social" className={theme === 'light' ? 'filter invert' : undefined} />
              </Link>
            </div>
            <div className="mx-2 cursor-pointer">
              <Link href="https://snapshot.org/#/bnugdao.eth">
                <Image src={images.snapshot} objectFit="contain" width={24} height={24} alt="social" className={theme === 'light' ? 'filter invert' : undefined} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
