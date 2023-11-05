/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    `./backend.${process.env.NODE_ENVIRONMENT}.config.json`,
    `./frontend.${process.env.NODE_ENVIRONMENT}.config.json`
  ]
 }

module.exports = nextConfig
