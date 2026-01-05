import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export', // Static Site Generation (SSG)
  images: {
    unoptimized: true, // Because we are using Static Site Generation (SSG)
  },
  devIndicators: false,
};

export default nextConfig;
