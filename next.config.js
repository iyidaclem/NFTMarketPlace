
const fs = require('fs');

const isProd = process.env.NODE_ENV === 'production';
const event_address = fs.readFileSync(process.env.MODE === 'prod'  ? 'deployed_event_address' : 'dev_deployed_event_address').toString().trim();
const token_address = fs.readFileSync(process.env.MODE === 'prod'  ? 'deployed_token_address' : 'dev_deployed_token_address').toString().trim();
const nft_address = fs.readFileSync(process.env.MODE === 'prod'  ? 'deployed_nft_address' : 'dev_deployed_nft_address').toString().trim();
module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack5: true,
  webpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.fallback = { fs: false, path: false, os: false, zlib: false, crypto: false, https: false, stream: false, assert: false, http: false };

    return config;
  },
  assetPrefix: isProd ? '/' : '',
  reactStrictMode: true,
  images: {
    domains: ['ipfs.io', 'bnug.xyz'],
    unoptimized: false,
  },
  env: {
    NEXT_PUBLIC_INFURA_APP_PROJECT_ID: process.env.NEXT_PUBLIC_INFURA_APP_PROJECT_ID,
    NEXT_PUBLIC_INFURA_APP_PROJECT_KEY: process.env.NEXT_PUBLIC_INFURA_APP_PROJECT_KEY,
    NEXT_PUBLIC_MAILCHIMP_URL: process.env.NEXT_PUBLIC_MAILCHIMP_URL,
    NEXT_PUBLIC_w3modalProjectId: process.env.NEXT_PUBLIC_w3modalProjectId,
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    NEXT_NODE_ENV: isProd,
    NEXT_EVENT_ADDRESS: event_address,
    NEXT_TOKEN_ADDRESS: token_address,
    NEXT_NFT_ADDRESS: nft_address
  },
};
