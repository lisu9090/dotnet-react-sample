/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: [ 'page.ts', 'page.tsx' ],
  output: 'standalone',
  i18n: {
    locales: ['en', 'de', 'pl'],
    defaultLocale: 'en',
  }
 }

export default nextConfig
