import Image from 'next/image';
import images from '../assets';
import { Banner } from '../components';

const ContactUs = () => (
  <div className="flex flex-col items-center mx-10 py-20">
    <Banner
      name={(<> <h1>Contact Us</h1></>)}
      childStyles="md:text-4xl sm:text-4xl xs:text-4xl text-left text-center"
      parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
    />
    <div className="flex flex-row md:flex-row md:items-center w-11/12 max-w-6xl">
      <div className="flex-1 mb-10 md:mb-0 md:mr-10 text-center">
        <p className="text-lg mb-5">
          If you have any questions or comments, please feel free to reach out to us using the information below:
        </p>
        <ul className="flex justify-between md:flex-col  w full px-10 py-5 mt-5 align-middle text-lg mb-5">
          <li className="flex items-center mb-3">
            <Image
              src={images.facebook}
              width={30}
              height={30}
              alt="Facebook"
              className="mr-3 text-cyan-100"
            />
            <a className="ml-3" href="https://www.facebook.com/BlockchainNG">Facebook</a>
          </li>
          <li className="flex items-center mb-3">
            <Image
              src={images.twitter}
              width={30}
              height={30}
              alt="Twitter"
              className="mr-3 text-cyan-100"
            />
            <a className="ml-3" href="https://twitter.com/BlockchainNG">Twitter</a>
          </li>
          <li className="flex items-center mb-3">
            <Image
              src={images.instagram}
              width={30}
              height={30}
              alt="Instagram"
              className="mr-3 text-cyan-100"
            />
            <a className="ml-3" href="https://www.instagram.com/blockchainnigeria/">Instagram</a>
          </li>
          <li className="flex items-center mb-3">
            <Image
              src={images.snapshot}
              width={30}
              height={30}
              alt="Email"
              className="mr-3 text-cyan-100"
            />
            <a className="ml-3" href="https://snapshot.org/#/bnugdao.eth">Snapshot</a>
          </li>
          <li className="flex items-center mb-3">
            <Image
              src={images.telegram}
              width={30}
              height={30}
              alt="Email"
              className="mr-3 text-cyan-100"
            />
            <a className="ml-3" href="https://t.me/+T7VwGW-Ftwh60LhF">Telegram</a>
          </li>
          <li className="flex items-center mb-3">
            <Image
              src={images.email}
              width={30}
              height={30}
              alt="Instagram"
              className="mr-3 text-cyan-100"
            />
            <a className="ml-3" href="mailto:info@blockchainnigeria.group">info@blockchainnigeria.group</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// Follow us on Twitter:
// Follow us on Instagram:
// Follow us on Facebook:
// Join us on Telegram:
// Join BNUGDAO:

// Drop us a mail:
export default ContactUs;
