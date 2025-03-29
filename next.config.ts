import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Add a rule to handle the @codemirror packages
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    // Add a rule to handle the @sanity/vision package
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules\/@sanity\/vision/,
      type: "javascript/auto",
    });

    return config;
  },
  experimental: {
    turbo: {
      loaders: {
        '/studio/**': ['next/dist/compiled/@next/font/google/loader']
      }
    },
  },
};

export default nextConfig; 