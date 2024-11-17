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
      },{
        protocol:"https",
        hostname:"static.vecteezy.com"
      }
    ],
  },
};

export default nextConfig;

