/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    `./backend.${process.env.NEXT_PUBLIC_NODE_ENVIRONMENT}.config.json`,
    `./frontend.${process.env.NEXT_PUBLIC_NODE_ENVIRONMENT}.config.json`
  ]
 }

module.exports = nextConfig
