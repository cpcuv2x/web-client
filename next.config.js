/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: () => [
    { source: '/:path*', destination: 'http://localhost:5000/:path*' },
  ],
}

module.exports = nextConfig
