import marketAbi from './NFTMarketplaceV2.json';
import TokenAbi from './BNUGToken.json';
import BNUGEventABI from './BNUGEvent.json';

// export const MarketAddress = '0x6597740fDe132DC63f1c098b92A10FBCCD7437d4';
export const MarketAddress =  process.env.NEXT_NFT_ADDRESS
export const TESTMarketAddress =  process.env.NEXT_TEST_NFT_ADDRESS
export const MarketAddressABI = marketAbi.abi;

export const TokenAddress =  process.env.NEXT_TOKEN_ADDRESS
export const TESTTokenAddress =  process.env.NEXT_TEST_TOKEN_ADDRESS
export const TokenAddressABI = TokenAbi.abi;

export const BNUGEventAddress =  process.env.NEXT_EVENT_ADDRESS
export const TESTBNUGEventAddress =  process.env.NEXT_TEST_EVENT_ADDRESS
export const BNUGEventAddressABI = BNUGEventABI.abi;

export const zeroAddress = '0x0000000000000000000000000000000000000000';
