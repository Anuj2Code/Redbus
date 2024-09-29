/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
        port: "",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol:"https",
        hostname:"lh3.googleusercontent.com"
      },
      {
        protocol:"https",
        hostname:"media.licdn.com"
      }
    ],
  },
};

export default nextConfig;
