
import { useState } from 'react';
import Image from 'next/image';
import images from '../assets';
import { Banner, Button } from '../components';

const EventTicket = () => {  

  const [qty, setQty] = useState(1)
  const [isMinting, setIsMinting] = useState(false)
  const [id, setId] = useState(0)
  const [price, setPrice] = useState(0)

  function changeQty(e)
  {
    setQty(e.target.value)
  }

return <div className="flex flex-col justify-center p-5 ">
 
 {
  isMinting && <div className='w-full h-full fixed  top-0 flex flex-col justify-center  content-center z-50'>
  <div className='bg-nft-dark w-full h-full opacity-25'></div>
  <div className='fixed  w-1/4 md:w-4/5 h-auto left-100 self-center bg-white rounded-lg p-5 text-nft-dark'>
    <div className='text-right cursor-pointer' onClick={() => setIsMinting(false)}>
      <span>X</span>
    </div>
    <h1 className='text-nft-dark text-3xl'>Mint {id == 0 ? "GENERAL": id == 1 ? "VIP": "DEVS"} ticket</h1> <br />
    <input type='range' value={qty} min={1} max={10} className='w-full' onChange={changeQty} />
    <div className='w-full flex flex-row justify-between'>
      <span>1</span>
      <span>10</span>
    </div>
    <div className='text-center'>
      <ul>
        <li>Qty: {qty}</li>
        <li>Token Id: {id}</li>
        <li>Price: {price} celo</li>
      </ul>
    </div>
    <br></br>
   <div className='text-center'>
   <Button btnName={`Mint for ${price * qty} celo`} btnType={"primary"} classStyles={"rounded-full"} />
   </div>
  </div>
</div>
 }
    <Banner
      name={(<>
        <h1>Decentralized Intelligence </h1>
        <p className='text-2xl p-5 text-dark-50'>
          Event Ticket NFT
        </p>
      </>)}
      childStyles="md:text-4xl sm:text-4xl xs:text-4xl text-left text-center"
      parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
    />
    <div className="flex justify-center w-full">
      <div className="flex  flex-row justify-between md:flex-col rounded-lg  w-full dark:bg-nft-dark bg-white text-white p-5">
        <div className='w-1/4 md:w-full flex flex-col justify-center border bg-white dark:bg-nft-dark rounded-lg bg p-5 font-poppins drop-shadow-xl mb-3'>
          <div className='flex flex-row justify-center m-3'>
            <Image src={images.general} width={50} height={50} className='rounded-full' />
          </div>

          <div className='flex flex-row justify-center text-nft-dark dark:text-white'>GENERAL</div>
          <div className='flex flex-row justify-center m-3'>

            <Button btnType={"outline"} btnName="$0.0" classStyles={"rounded-full text-nft-dark dark:text-white w-2/4"} />
          </div>
          <ul>
            <li className="mt-3 text-nft-dark dark:text-white flex flex-row w-full border-b justify-between">
              <span>
                Access to the event center
              </span>
              <span>
                <Image src={images.tick} width={30} height={30} />
              </span>
              <hr />
            </li>
            <li className="mt-3 text-nft-dark dark:text-white flex flex-row w-full border-b justify-between">
              <span>
                Access to the event center
              </span>
              <span>
                <Image src={images.tick} width={30} height={30} />
              </span>
              <hr />
            </li>
            <li className="mt-3 text-nft-dark dark:text-white flex flex-row w-full border-b justify-between">
              <span>
                Access to the event center
              </span>
              <span>
                <Image src={images.tick} width={30} height={30} />
              </span>
              <hr />
            </li>
          </ul>
          <div className='flex flex-row justify-center'> <br />
            <Button btnType={"primary"} btnName="Mint Ticket" handleClick={() => {setIsMinting(true), setId(0), setPrice(0)}} classStyles={"w-3/4  mt-5 m-4"} />
          </div>
        </div>
        <div className='w-1/4 md:w-full   flex flex-col justify-center border bg-white dark:bg-nft-dark rounded-lg  bg p-5 font-poppins drop-shadow-xl mb-3'>
          <div className='flex flex-row justify-center m-3'>
            <Image src={images.vip} width={50} height={50} className='rounded-full' />
          </div>

          <div className='flex flex-row justify-center text-nft-dark dark:text-white'>VIP</div>
          <div className='flex flex-row justify-center m-3'>

            <Button btnType={"outline"} btnName="$0.0" classStyles={"rounded-full text-nft-dark dark:text-white w-2/4"} />
          </div>
          <ul>
            <li className="mt-3 text-nft-dark dark:text-white flex flex-row w-full border-b justify-between">
              <span>
                Access to the event center
              </span>
              <span>
                <Image src={images.tick} width={30} height={30} />
              </span>
              <hr />
            </li>
            <li className="mt-3 text-nft-dark dark:text-white flex flex-row w-full border-b justify-between">
              <span>
                Access to the event center
              </span>
              <span>
                <Image src={images.tick} width={30} height={30} />
              </span>
              <hr />
            </li>
            <li className="mt-3 text-nft-dark dark:text-white flex flex-row w-full border-b justify-between">
              <span>
                Access to the event center
              </span>
              <span>
                <Image src={images.tick} width={30} height={30} />
              </span>
              <hr />
            </li>
          </ul>
          <div className='flex flex-row justify-center'> <br />
            <Button btnType={"primary"} btnName="Mint Ticket" handleClick={() => {setIsMinting(true), setId(1), setPrice(0.5)}} classStyles={"w-3/4  mt-5 m-4"} />
          </div>
        </div>
        <div className='w-1/4 md:w-full   flex flex-col justify-center border bg-white dark:bg-nft-dark rounded-lg  bg p-5 font-poppins drop-shadow-xl mb-3'>
          <div className='flex flex-row justify-center m-3'>
            <Image src={images.devs} width={50} height={50} className='rounded-full' />
          </div>

          <div className='flex flex-row justify-center text-nft-dark dark:text-white'>DEVS</div>
          <div className='flex flex-row justify-center m-3'>

            <Button btnType={"outline"} btnName="$0.0" classStyles={"rounded-full text-nft-dark dark:text-white w-2/4"} />
          </div>
          <ul>
            <li className="mt-3 text-nft-dark dark:text-white flex flex-row w-full border-b justify-between">
              <span>
                Access to the event center
              </span>
              <span>
                <Image src={images.tick} width={30} height={30} />
              </span>
              <hr />
            </li>
            <li className="mt-3 text-nft-dark dark:text-white flex flex-row w-full border-b justify-between">
              <span>
                Access to the event center
              </span>
              <span>
                <Image src={images.tick} width={30} height={30} />
              </span>
              <hr />
            </li>
            <li className="mt-3 text-nft-dark dark:text-white flex flex-row w-full border-b justify-between">
              <span>
                Access to the event center
              </span>
              <span>
                <Image src={images.tick} width={30} height={30} />
              </span>
              <hr />
            </li>
          </ul>
          <div className='flex flex-row justify-center'> <br />
            <Button btnType={"primary"} btnName="Mint Ticket" handleClick={() => {setIsMinting(true), setId(2), setPrice(1)}} classStyles={"w-3/4  mt-5 m-4"} />
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default EventTicket;