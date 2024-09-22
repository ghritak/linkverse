/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'dynamic-media-cdn.tripadvisor.com',
      'bihubyte.com',
      '127.0.0.1',
      'localhost',
      'static.wikia.nocookie.net',
      'linkverse.onrender.com',
      'linkversee.netlify.app',
	  'avatars.githubusercontent.com'
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**'
      }
    ]
  }
}

module.exports = nextConfig
