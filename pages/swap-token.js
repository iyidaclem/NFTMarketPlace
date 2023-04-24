import Image from 'next/image';
import images from '../assets';
import { Banner, Button } from '../components';

const TokenSwap = () => (
  <div className="flex flex-col justify-center p-5 ">
    <Banner
      name={(<> <h1>TOKEN SWAPPING</h1></>)}
      childStyles="md:text-4xl sm:text-4xl xs:text-4xl text-left text-center"
      parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
    />
    <div className="flex justify-center">
      <div className="flex flex-col rounded-lg  md:w-1/2 lg:w-1/2 sm:w-full bg-white text-nft-dark p-5">
        <div className="">
          <h1 className="text-3xl font-poppins">TOKEN SWAP</h1>
          <div className="bg-gray-500 m-1 p-5 rounded-lg">
            <h1>From</h1>
            <div className="rounded-lg flex flex-row justify-between align-baseline border border-dark bg-white">
              <div className="bg-gray-400 flex flex-row rounded-lg p-2 w-25">
                <Image
                  src={images.logo02}
                  width={30}
                  height={30}
                  objectFit="cover"
                  className="m-4 rounded-full flex-2"
                />
                <select className="bg-gray-400 flex-1">
                  <option>BNUG</option>
                </select>
              </div>
              <div className="flex  justify-end align-middle p-2 pr-5">
                <input className="bg-none w-20 bg-white text-right" type="number" value="0.00" /> <span className="text-gray-500 p-3"> (~0.00)</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-500 m-1 p-5 rounded-lg">
            <h1>TO</h1>
            <div className="rounded-lg flex flex-row justify-between align-baseline w-full border border-dark bg-white">
              <div className="bg-gray-400 flex flex-row rounded-lg p-2 w-25">
                <Image
                  src={images.celo}
                  width={30}
                  height={30}
                  objectFit="cover"
                  className="m-4 rounded-full flex-2"
                />
                <select className="bg-gray-400 flex-1">
                  <option>CELO</option>
                </select>
              </div>
              <div className="flex  justify-end align-middle p-2 pr-5">
                <input className="bg-none w-20 bg-white text-right" type="number" value="0.00" /> <span className="text-gray-500 p-3"> (~0.00)</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center p-5">Coming Soon</p>
        <Button
          btnName="SWAP TOKEN"
          btnType="primary"
          classStyles="rounded-xl bg-white"
          handleClick={() => {}}
        />
      </div>
    </div>
  </div>
);

export default TokenSwap;
