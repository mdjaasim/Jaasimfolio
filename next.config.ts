import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  images: { loader: 'custom', loaderFile: './src/lib/image-loader.ts' },
  poweredByHeader: false,
};

export default config;
