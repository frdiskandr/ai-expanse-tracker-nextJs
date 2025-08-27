import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // terima semua host https
      },
      {
        protocol: 'http',
        hostname: '**', // terima semua host http (kalau perlu)
      },
    ],
  },
};

export default nextConfig;
