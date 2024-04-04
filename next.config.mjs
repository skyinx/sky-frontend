/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    PUBLIC_NEXT_BASE_URL: process.env.PUBLIC_NEXT_BASE_URL,
  },
};

export default nextConfig;
