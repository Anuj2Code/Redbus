import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint checks during build
  },
  typescript: {
    ignoreBuildErrors: true, // Disables TypeScript type-checking errors during build
  },
};

export default nextConfig;
