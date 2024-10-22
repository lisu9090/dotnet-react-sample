/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: [ 'page.ts', 'page.tsx' ],
  output: 'standalone',
  i18n: {
    locales: ['en-US', 'de-DE', 'pl'],
    defaultLocale: 'en-US',
  }
 }

export default nextConfig
