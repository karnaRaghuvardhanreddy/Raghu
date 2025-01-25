const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['www.freecodecamp.org', 'res.cloudinary.com'],  // Merge both domains in a single array
  },
  basePath: isProduction ? '/Raghu' : '',
  assetPrefix: isProduction ? '/Raghu/' : '',
};

module.exports = nextConfig;
