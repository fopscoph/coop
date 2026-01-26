import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "portal.fopsco.ph",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;