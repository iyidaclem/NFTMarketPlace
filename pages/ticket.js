import { useState, useContext } from 'react';
import Image from 'next/image';
import images from '../assets';
import { Banner, Button, Loader } from '../components';
import { NFTContext } from '../context/NFTContext';
import Swal from 'sweetalert2'
import { ethers } from 'ethers';

const EventTicket = () => {

  const [qty, setQty] = useState(1)
  const [isMinting, setIsMinting] = useState(false)
  const [id, setId] = useState(0)
  const [price, setPrice] = useState(0)
  const { mintTicket, isLoadingNFT, getFee, BNUGEventAddress, TESTBNUGEventAddress } = useContext(NFTContext)
  const [isLoading, setIsLoading] = useState(false)
  const [fees, setFees] = useState([0,0,0])
  const [copied, setCopied] = useState(false)
  const [contractAddress, setContractAddress] = useState("0x0")

  function changeQty(e) {
    setQty(e.target.value)
  }


  async function mint() {
    try {
      await mintTicket(id, qty)

      Swal.fire(
        {
          title: "Success",
          text: "Minted Successfully",
          icon: "success",
          confirmButtonText: "Close"
        }
      )
    }
    catch (error) {
      Swal.fire({
        title: 'Error!',
        text: "Ops! Something went wrong",
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
    finally {
      setIsMinting(false);
    }
  }

  useState(async () => {
      const gen = await getFee(0)
      const vip = await getFee(1)
      const devs = await getFee(2)
      setContractAddress(localStorage.getItem("isLive") == "live" || false ? BNUGEventAddress : TESTBNUGEventAddress)
      setFees([gen, vip, devs])
  }, [])

  return <div className="flex flex-col justify-center p-5 ">

    {

      isMinting && <div className='w-full h-full fixed  top-0 flex flex-col justify-center  content-center z-50'>
        <div className='bg-nft-dark w-full h-full opacity-25'></div>
        <div className='fixed  w-1/4 md:w-4/5 h-auto left-100 self-center bg-white rounded-lg p-5 text-nft-dark'>
          <div className='text-right cursor-pointer' onClick={() => setIsMinting(false)}>
            <span>X</span>
          </div>
          <h1 className='text-nft-dark text-3xl'>Mint {id == 0 ? "GENERAL" : id == 1 ? "VIP" : "DEVS"} ticket</h1> <br />
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
            {isLoadingNFT ? <Loader /> : <Button btnName={`Mint for ${price * qty} celo`} btnType={"primary"} classStyles={"rounded-full"} handleClick={() => mint()} />}
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

          <div className='flex flex-row justify-center text-nft-dark dark:text-white'>GENERAL #0</div>
          <div className='flex flex-row justify-center m-3'>

            <Button btnType={"outline"} btnName={`${fees[0]} CELO`} classStyles={"rounded-full text-nft-dark dark:text-white w-2/4"} />
          </div>
          <ul>
            {[
              "access to holders to All the Conference Session",
              "Panel sessions and Exhibition area"
            ].map(e => <li className="mt-3 text-nft-dark dark:text-white flex flex-row w-full border-b justify-between">
              <span>
                {e}
              </span>
              <span>
                <Image src={images.tick} width={30} height={30} />
              </span>
              <hr />
            </li>)}

          </ul>
          <div className='flex flex-row justify-center'> <br />
            <Button btnType={"primary"} btnName="Mint Ticket" handleClick={() => { setIsMinting(true), setId(0), setPrice(fees[0]) }} classStyles={"w-3/4  mt-5 m-4"} />
          </div>
        </div>
        <div className='w-1/4 md:w-full   flex flex-col justify-center border bg-white dark:bg-nft-dark rounded-lg  bg p-5 font-poppins drop-shadow-xl mb-3'>
          <div className='flex flex-row justify-center m-3'>
            <Image src={images.vip} width={50} height={50} className='rounded-full' />
          </div>

          <div className='flex flex-row justify-center text-nft-dark dark:text-white'>VIP #1</div>
          <div className='flex flex-row justify-center m-3'>

            <Button btnType={"outline"} btnName={`${fees[1]} CELO`} classStyles={"rounded-full text-nft-dark dark:text-white w-2/4"} />
          </div>
          <ul>
            {[
              "Access to holders to All the Conference Session",
              "Panel sessions and Exhibition area",
              "Access to exclusive dinner and networking evening"
            ].map(e => <li className="mt-3 text-nft-dark dark:text-white flex flex-row w-full border-b justify-between">
              <span>
                {e}
              </span>
              <span>
                <Image src={images.tick} width={30} height={30} />
              </span>
              <hr />
            </li>)}
          </ul>
          <div className='flex flex-row justify-center'> <br />
            <Button btnType={"primary"} btnName="Mint Ticket" handleClick={() => { setIsMinting(true), setId(1), setPrice(fees[1]) }} classStyles={"w-3/4  mt-5 m-4"} />
          </div>
        </div>
        <div className='w-1/4 md:w-full   flex flex-col justify-center border bg-white dark:bg-nft-dark rounded-lg  bg p-5 font-poppins drop-shadow-xl mb-3'>
          <div className='flex flex-row justify-center m-3'>
            <Image src={images.devs} width={50} height={50} className='rounded-full' />
          </div>

          <div className='flex flex-row justify-center text-nft-dark dark:text-white'>DEVS #2</div>
          <div className='flex flex-row justify-center m-3'>

            <Button btnType={"outline"} btnName={`${fees[2]} CELO`} classStyles={"rounded-full text-1xl text-nft-dark dark:text-white w-2/4"} />
          </div>
          <ul>
            {[
              "Web3 Developer Workshop",
              "AI Prompt Engineering Workshop",
              "Build with CELO Workshop"
            ].map(e => <li className="mt-3 text-nft-dark dark:text-white flex flex-row w-full border-b justify-between">
              <span>
                {e}
              </span>
              <span>
                <Image src={images.tick} width={30} height={30} />
              </span>
              <hr />
            </li>)}
          </ul>
          <div className='flex flex-row justify-center'> <br />
            <Button btnType={"primary"} btnName="Mint Ticket" handleClick={() => { setIsMinting(true), setId(2), setPrice(fees[2]) }} classStyles={"w-3/4  mt-5 m-4"} />
          </div>
        </div>
      </div>
    </div>
   <div className='flex flex-column justify-center'>
    <h1 className='mr-5 dark:text-white text-black font-poppins font-semibold text-white rounded-md mt-5'>Contract Address:</h1> 
   
   <br /> <br></br>
                <button
                  type="button"
                  className="nft-gradient h-full text-sm minlg:text-lg py-3 px-6 minlg:py-4 minlg:px-8 font-poppins font-semibold text-white rounded-md mt-2"
                  onClick={() => {
                    navigator.clipboard.writeText(contractAddress);
                    setCopied(!copied);
                  }}
                >
                  {copied ? 'Copied' : `${ contractAddress.substring(0, 3)+ "..."+ contractAddress.substring(contractAddress.length - 4, contractAddress.length - 1) }`}
                </button>
             
   </div>
  </div>
};

export default EventTicket;
