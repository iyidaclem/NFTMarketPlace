const isProd = process.env.NODE_ENV === 'production';
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
<<<<<<< HEAD
    domains: ['ipfs.io', 'bnug.xyz'],
=======
    domains: ['ipfs.io'],
>>>>>>> 0e21686fb1ee75dcc28d3c2630d468aaa3c203a6
    unoptimized: false,
  },
  env: {
    REACT_APP_PROJECT_ID: process.env.REACT_APP_PROJECT_ID,
    REACT_APP_PROJECT_KEY: process.env.REACT_APP_PROJECT_KEY,
    MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
    MAILCHIMP_LIST_ID: process.env.MAILCHIMP_LIST_ID,
    NEXT_PUBLIC_MAILCHIMP_URL: process.env.NEXT_PUBLIC_MAILCHIMP_URL,
    w3modalProjectId: process.env.w3modalProjectId,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};
