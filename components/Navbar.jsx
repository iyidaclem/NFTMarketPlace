import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { Web3Button } from '@web3modal/react';
import Head from 'next/head';
import { useAccount, useDisconnect, useConnect, useNetwork, useSwitchNetwork } from 'wagmi';
import images from '../assets';
import { NFTContext } from '../context/NFTContext';
import Button from './Button';
import { zeroAddress } from '../context/constants';

const MenuItems = ({ isMobile, active, setActive, setIsOpen, isOpen }) => {
  const { currentAccount, imagePaths, getUser } = useContext(NFTContext);
  const [userData, setuserData] = useState(null);
  const { isConnected } = useAccount();
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/created-nfts';
      case 2:
        return '/swap-token';
      case 3:
        return '/create-nft';
      case 4:
        return '/ticket';
      case 5:
        return '/profile';
      default:
        return '/';
    }
  };

  useEffect(async () => {
    // if(!isConnected) return open();
    try {
      const { 0: uD } = await getUser(currentAccount || zeroAddress);
      setuserData(uD);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
      {['Explore NFTs', 'Listed NFTs', 'Swap Token', 'Create NFT', "Event Ticket", 'Profile'].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item);

            if (isMobile) setIsOpen(false);
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
          ${(i === 4 || i === 3 || i === 2) && !isConnected && 'hidden'
            }
          ${item === 'Create NFT' && !isOpen && 'hidden'}
          ${active === item
              ? 'dark:text-white text-nft-black-1'
              : 'dark:text-nft-gray-3 text-nft-gray-2'} 
          ${isMobile && 'my-5 text-xl'}`}
        >
          <Link href={generateLink(i)}>{item === 'Profile' ? (
            <div className="m-1 flex flex-col justify-center mr-2 cursor-pointer">
              <Image src={imagePaths[userData ? userData.userId : 0]} className="rounded-full object-cover" width={30} height={30} objectFit="cover" />
            </div>
          ) : item}
          </Link>

        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router, setIsOpen }) => {
  const { isConnected } = useAccount();

  return isConnected ? (
    <div className="flexCenter">
      <Button
        btnName="Create"
        btnType="primary"
        classStyles="mx-2 rounded-xl"
        handleClick={() => {
          setActive('');
          router.push('/create-nft');
          setIsOpen(false);
        }}
      />
    </div>

  )
    : <Web3Button />;
};

const checkActive = (active, setActive, router) => {
  switch (router.pathname) {
    case '/':
      if (active !== 'Explore NFTs') setActive('Explore NFTs');
      break;
    case '/created-nfts':
      if (active !== 'Listed NFTs') setActive('Listed NFTs');
      break;
    case '/my-nfts':
      if (active !== 'My NFTs') setActive('My NFTs');
      break;
    case '/swap-token':
      if (active !== 'Swap Token') setActive('Swap Token');
      break;
    case '/create-nft':
      if (active !== '') setActive('');
      break;
    default:
      setActive('');
  }
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState('Explore NFTs');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { appName, imagePaths, getUser, currentAccount } = useContext(NFTContext);
  const [userData, setuserData] = useState(null);
  const { isConnected } = useAccount();
  const [isLive, setIsLive] = useState(false)
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  useEffect(async () => {
    if (!currentAccount) return;
    const { 0: uD } = await getUser(currentAccount || zeroAddress);
    setuserData(uD);
  }, []);

  useEffect(() => {
    setTheme('dark');
  }, []);

  useEffect(() => {
    checkActive(active, setActive, router);
  }, [router.pathname]);

  useEffect(() => {
    // disable body scroll when navbar is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isOpen]);

  useEffect(() => {
    setIsLive(localStorage.getItem("isLive") == "live" || false)
  })

  const changeMode = async () => {
    localStorage.setItem("isLive", isLive ? "test" : "live")
    setIsLive(localStorage.getItem("isLive") == "live" || false)
    disconnect()
    switchNetwork?.(isLive ? 44787 : 42220)
    location.href = location.href
  }

  return (
    <>
      <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
        <Head>
          <title>BNUGDAO</title>
        </Head>
        <div className="flex flex-1 flex-row justify-start">
          <Link href="/">
            <div className="flexCenter md:hidden cursor-pointer" onClick={() => setActive('Explore NFTs')}>
              <Image className="rounded-full" src={images.logo02} objectFit="contain" width={32} height={32} alt="logo" />
              <p className=" dark:text-white text-nft-black-1 font-semibold text-lg ml-1">{appName}</p>
            </div>
          </Link>
          <Link href="/">
            <div
              className="hidden md:flex"
              onClick={() => {
                setActive('Explore NFTs');
                setIsOpen(false);
              }}
            >
              <Image src={images.logo02} objectFit="contain" width={32} height={32} alt="logo" />
            </div>
          </Link>
        </div>
        <label class="relative inline-flex items-center cursor-pointer mr-5">
          <input type="checkbox" checked={isLive} onClick={() => { changeMode() }} class="sr-only peer" />
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span class={`ml-3 text-sm font-medium ${isLive ? "text-green-500" : "text-red-300"}`}>{isLive ? "Live" : "Testnet"}!</span>
        </label>

        <div className="flex flex-initial flex-row justify-end">
          <div className="flex items-center ml-3 mr-2">
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
            <label htmlFor="checkbox" className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label">
              <i className="fas fa-sun" />
              <i className="fas fa-moon" />
              <div className="w-3 h-3 absolute bg-white rounded-full ball" />
            </label>
          </div>

          <div className="md:hidden flex">
            <ul className="list-none flexCenter flex-row">
              <MenuItems active={active} setActive={setActive} />
            </ul>
            <div className="ml-4">
              <ButtonGroup setActive={setActive} router={router} />
            </div>
          </div>
        </div>
        <div className="hidden md:flex ml-2">
          <div className={`m-1 flex flex-col justify-center mr-2 cursor-pointer ${!isConnected && 'hidden'}`}>
            <Link href="/profile">
              <Image src={imagePaths[userData ? userData.userId : 0]} className="rounded-full  mr- object-cover" width={30} height={30} objectFit="cover" />
            </Link>
          </div>
          {!isOpen
            ? (
              <Image
                src={images.menu}
                objectFit="contain"
                width={25}
                height={25}
                alt="menu"
                onClick={() => setIsOpen(!isOpen)}
                className={theme === 'light' ? 'filter invert' : undefined}
              />
            )
            : (
              <Image
                src={images.cross}
                objectFit="contain"
                width={20}
                height={20}
                alt="close"
                onClick={() => setIsOpen(!isOpen)}
                className={theme === 'light' ? 'filter invert' : undefined}
              />
            )}

          {isOpen && (
            <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
              <div className="flex-1 p-4">
                <MenuItems active={active} setActive={setActive} isMobile setIsOpen={setIsOpen} isOpen={isOpen} />
              </div>
              <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
                <ButtonGroup setActive={setActive} router={router} setIsOpen={setIsOpen} />
              </div>
            </div>
          )}
        </div>
      </nav>
      <br />
    </>
  );
};

export default Navbar;
