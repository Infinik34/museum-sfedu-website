import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1', // Добавляем явное разрешение для IPv4
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https', // На случай будущего продакшена
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_STRAPI_URL: 'http://localhost:1337',
  },
};

export default nextConfig;
