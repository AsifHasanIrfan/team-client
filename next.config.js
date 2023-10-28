/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cutt.ly', 'res.cloudinary.com'],
  },
  env: {
    // serverUrl: 'http://localhost:4000/api/',
    // mainServerUrl: 'http://localhost:4000/',
    serverUrl: 'https://team-x3af.onrender.com/api/',
    mainServerUrl: 'https://team-x3af.onrender.com/',
  },
};

module.exports = nextConfig;
