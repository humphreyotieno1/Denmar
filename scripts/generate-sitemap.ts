import fs from 'fs';
import { globby } from 'globby';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Site configuration
const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.denmartravel.co.ke',
};

async function generateSites() {
  try {
    // 1. Get all static pages
    const pages = await globby([
      'app/**/page.tsx',
      '!app/**/\\[*\\]/page.tsx', // Exclude dynamic routes
      '!app/**/layout.tsx',
      '!app/**/loading.tsx',
      '!app/**/error.tsx',
      '!app/**/not-found.tsx',
      '!app/api/**',
    ]);

    // Convert file paths to URLs for static pages
    const staticPageUrls = pages.map((page) => {
      const path = page
        .replace('app', '')
        .replace('.tsx', '')
        .replace('/page', '');
      return `${siteConfig.siteUrl}${path}`;
    });

    // 2. Fetch dynamic data from Prisma
    const [dbCountries, dbDestinations, dbPackages, dbDeals, dbServices] = await Promise.all([
      prisma.country.findMany({ where: { isActive: true } }),
      prisma.destination.findMany({ where: { isActive: true } }),
      prisma.package.findMany({ where: { isActive: true } }),
      prisma.deal.findMany({ where: { isActive: true } }),
      prisma.service.findMany({ where: { isActive: true } }),
    ]);

    // 3. Generate dynamic destination URLs
    const destinationUrls = dbCountries.flatMap((country) => {
      const countryUrl = `${siteConfig.siteUrl}/destinations/${country.slug}`;
      
      // Get destinations for this country
      const countryDestinations = dbDestinations.filter((dest) => dest.countryId === country.id);
      
      // Create destination detail URLs
      const destUrls = countryDestinations.map((dest) => 
        `${siteConfig.siteUrl}/destinations/${country.slug}/${dest.slug}`
      );
      
      return [countryUrl, ...destUrls];
    });

    // 4. Generate other dynamic URLs
    const packageUrls = dbPackages.map((pkg) => 
      `${siteConfig.siteUrl}/packages/${pkg.slug}`
    );

    const dealUrls = dbDeals.map((deal) => 
      `${siteConfig.siteUrl}/deals/${deal.slug}`
    );

    const serviceUrls = dbServices.map((service) => 
      `${siteConfig.siteUrl}/services/${service.slug}`
    );

    // 5. Combine all URLs and remove duplicates
    const allUrls = Array.from(new Set([
      siteConfig.siteUrl,
      `${siteConfig.siteUrl}/about`,
      `${siteConfig.siteUrl}/contact`,
      `${siteConfig.siteUrl}/deals`,
      `${siteConfig.siteUrl}/destinations`,
      `${siteConfig.siteUrl}/services`,
      `${siteConfig.siteUrl}/packages`,
      ...destinationUrls,
      ...packageUrls,
      ...dealUrls,
      ...serviceUrls,
    ]));

    // Helper function to determine priority based on URL
    const getPriority = (url: string): string => {
      const urlParts = url.replace(siteConfig.siteUrl, '').split('/').filter(Boolean);
      
      if (urlParts.length === 0) return '1.0'; // Homepage
      if (urlParts.length === 1) return '0.9'; // Main pages (about, contact, etc.)
      if (urlParts[0] === 'destinations' && urlParts.length === 2) return '0.9'; // Country pages
      if (urlParts[0] === 'destinations' && urlParts.length === 3) return '0.8'; // Destination detail
      if (urlParts[0] === 'packages' && urlParts.length === 2) return '0.8'; // Package detail
      if (urlParts[0] === 'deals' && urlParts.length === 2) return '0.7'; // Deal detail
      if (urlParts[0] === 'services' && urlParts.length === 2) return '0.7'; // Service detail
      return '0.6';
    };

    // Helper function to determine changefreq based on URL
    const getChangeFreq = (url: string): string => {
      if (url.includes('/deals/')) return 'daily';
      return 'weekly';
    };

    // Generate sitemap.xml content
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls
        .map(
          (url) => `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>${getChangeFreq(url)}</changefreq>
          <priority>${getPriority(url)}</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`;

    // Write sitemap to public directory
    fs.writeFileSync('public/sitemap.xml', sitemap.trim());
    console.log(`Sitemap generated successfully with ${allUrls.length} URLs`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  } finally {
    await prisma.$disconnect();
  }
}

generateSites().catch(console.error);

