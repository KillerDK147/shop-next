/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env : {
    url : process.env.url,
  },
  
}

module.exports = nextConfig
