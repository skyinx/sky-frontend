/** @type {import('next').NextConfig} */

const nextConfig = {
  publicRuntimeConfig: {
    NEXT_PUBLIC_PDF_PATH: process.env.NEXT_PUBLIC_PDF_PATH,
  },
};

export default nextConfig;
