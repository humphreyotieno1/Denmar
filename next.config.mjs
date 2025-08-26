/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Redirect old destination URLs to new structure
      {
        source: '/destinations/mombasa',
        destination: '/destinations/kenya/mombasa',
        permanent: true,
      },
      {
        source: '/destinations/nairobi',
        destination: '/destinations/kenya/nairobi',
        permanent: true,
      },
      {
        source: '/destinations/dubai',
        destination: '/destinations/uae/dubai',
        permanent: true,
      },
      {
        source: '/destinations/zanzibar',
        destination: '/destinations/tanzania/zanzibar',
        permanent: true,
      },
      {
        source: '/destinations/thailand',
        destination: '/destinations/thailand/bangkok',
        permanent: true,
      },
      {
        source: '/destinations/bali',
        destination: '/destinations/indonesia/bali',
        permanent: true,
      },
      {
        source: '/destinations/paris',
        destination: '/destinations/france/paris',
        permanent: true,
      },
      {
        source: '/destinations/tokyo',
        destination: '/destinations/japan/tokyo',
        permanent: true,
      },
      {
        source: '/destinations/santorini',
        destination: '/destinations/greece/santorini',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
