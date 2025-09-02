/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development practices
  reactStrictMode: true,
  
  // Enable production browser source maps for better debugging
  productionBrowserSourceMaps: true,
  
  // Enable compression for better performance
  compress: true,
  
  // Enable HTTP/2 server push
  httpAgentOptions: {
    keepAlive: true,
  },
  
  // Configure image optimization
  images: {
    unoptimized: true, // Disable default optimization since we're using next-optimized-images
    domains: ['denmartravel.co.ke', 'www.denmartravel.co.ke'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    formats: ['image/avif', 'image/webp'],
  },
  
  // Add security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
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
    ]
  },
}

export default nextConfig
