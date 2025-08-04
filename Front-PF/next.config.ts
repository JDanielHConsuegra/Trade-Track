import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "images.pexels.com",
      "localhost",
      "res.cloudinary.com",
      "miapp.com" 
    ],
  },
};

export default nextConfig;