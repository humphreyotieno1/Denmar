import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/denmar-portal/', '/admin/'],
    },
    sitemap: 'https://www.denmartravel.co.ke/sitemap.xml',
  }
}
