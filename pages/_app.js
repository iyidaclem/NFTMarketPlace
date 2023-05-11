import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { useEffect, useState } from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {
  celoAlfajores,
  celo,
} from 'wagmi/chains';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { NFTProvider } from '../context/NFTContext';
import { Footer, Navbar } from '../components';
import '../styles/globals.css';
import '../styles/generate.css';

const projectId = process.env.NEXT_PUBLIC_w3modalProjectId;
// 2. Configure wagmi client
const chains = [
  celoAlfajores,
  celo,
];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains);

const Marketplace = ({ Component, pageProps }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
          <NFTProvider mainprovider={provider}>
            <ThemeProvider attribute="class">
              <div className="dark:bg-nft-dark bg-white min-h-screen">
                <Navbar />
                <div class="w-full text-slate-500 text-white bg-slate-50">Testnet!</div>
                <div className="pt-65">
                  <Component {...pageProps} />
                </div>
                <Footer />
              </div>
              <Script src="https://www.jsdelivr.com/package/npm/ipfs-http-client" integrity="sha384-5bXRcW9kyxxnSMbOoHzraqa7Z0PQWIao+cgeg327zit1hz5LZCEbIMx/LWKPReuB" crossorigin="anonymous" />
              <Script src="https://kit.fontawesome.com/d45b25ceeb.js" crossorigin="anonymous" />
            </ThemeProvider>
          </NFTProvider>
        </WagmiConfig>
      ) : null}

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default Marketplace;
