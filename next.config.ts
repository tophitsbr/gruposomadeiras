import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost:3000",
    "192.168.1.101",
    "thin-tigers-beg.loca.lt",
    "silver-queens-hunt.loca.lt",
    "*.loca.lt",
    "*.ngrok-free.app",
    "*.ngrok-free.dev"
  ]
};

export default nextConfig;
