import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Izinkan gambar dari domain eksternal jika suatu saat dibutuhkan
    remotePatterns: [],
    // Format modern yang didukung Next.js
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
