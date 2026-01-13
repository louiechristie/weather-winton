import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export', // Static Site Generation (SSG)
  images: {
    unoptimized: true, // Because we are using Static Site Generation (SSG)
  },
  devIndicators: false,
  headers: async () => [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'louiechristies-projects.vercel.app' }],
      headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
    },
  ],
};

export default nextConfig;
