import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**", // accepte toutes les images
      },
      {
      protocol: "http",
      hostname: "localhost",
      port: "8000",
      pathname: "/**",
    },
    ],
  },
};

export default nextConfig;
