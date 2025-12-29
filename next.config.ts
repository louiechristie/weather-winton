import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true, // because we are using SSR
  },
  devIndicators: false,
};

export default nextConfig;
