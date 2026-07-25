import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
