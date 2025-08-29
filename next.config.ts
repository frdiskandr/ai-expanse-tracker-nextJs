import type { NextConfig } from "next";
import path, { dirname } from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

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

  turbopack:{
    root: path.join(__dirname),
  }
};

export default nextConfig;
