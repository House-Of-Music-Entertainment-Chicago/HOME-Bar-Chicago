/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "static.wixstatic.com" }],
  },
};

export default nextConfig;
