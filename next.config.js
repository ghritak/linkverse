/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // other properties...
  remotePatterns: [
    {
      protocol: 'http',
      hostname: '**'
    }
  ],
  images: {
    domains: [
      'images.unsplash.com',
      'dynamic-media-cdn.tripadvisor.com',
      'bihubyte.com',
      '127.0.0.1',
      'localhost',
      'static.wikia.nocookie.net'
    ]
  }
}

module.exports = nextConfig
