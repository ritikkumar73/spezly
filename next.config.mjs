/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },

  serverActions: {
    bodySizeLimit: "5mb",
  },
};

export default nextConfig;
