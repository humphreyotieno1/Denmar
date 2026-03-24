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
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'denmartravel.co.ke',
      },
      {
        protocol: 'https',
        hostname: 'www.denmartravel.co.ke',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    formats: ['image/avif', 'image/webp'],
  },
  
  // Add security headers
  async headers() {
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com *.facebook.net *.facebook.com *.cloudinary.com *.vercel-scripts.com;
      style-src 'self' 'unsafe-inline' fonts.googleapis.com;
      img-src 'self' blob: data: *.cloudinary.com *.googletagmanager.com *.google-analytics.com *.facebook.com *.facebook.net;
      font-src 'self' data: fonts.gstatic.com;
      connect-src 'self' *.googletagmanager.com *.google-analytics.com *.analytics.google.com *.facebook.com *.facebook.net *.cloudinary.com;
      frame-src 'self' *.facebook.com *.facebook.net;
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'self';
      object-src 'none';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim();

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
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
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
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
