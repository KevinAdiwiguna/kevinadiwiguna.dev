import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.kevinadiwiguna.dev",
        port: "",
      },
    ],
  }
};

export default nextConfig;
