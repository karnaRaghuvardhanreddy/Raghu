const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized:true,
    domains: ['www.freecodecamp.org'],
  },
  basePath: isProduction ? '/Portfolio' : '',
  assetPrefix: isProduction ? '/Portfolio/' : '',
};

module.exports = nextConfig;
