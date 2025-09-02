import fs from 'fs';
import { globby } from 'globby';
// Site configuration
const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://denmartravel.co.ke',
};

async function generateSites() {
  
  // Get all pages from the pages directory
  const pages = await globby([
    'app/**/*.tsx',
    '!app/_*.tsx',
    '!app/api',
    '!app/**/\[*\]', // Ignore dynamic routes for now
    '!app/**/layout.tsx',
    '!app/**/loading.tsx',
    '!app/**/error.tsx',
    '!app/**/not-found.tsx',
  ]);

  // Convert file paths to URLs
  const pageUrls = pages.map((page) => {
    const path = page
      .replace('app', '')
      .replace('.tsx', '')
      .replace('/page', '');
    return `${siteConfig.siteUrl}${path}`;
  });

  // Add static paths
  const staticPaths = [
    '/',
    '/about',
    '/contact',
    '/deals',
    '/destinations',
    '/services',
  ];

  // Combine all URLs
  const allUrls = [...new Set([...staticPaths, ...pageUrls])];

  // Generate sitemap.xml
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls
        .map(
          (url) => `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>${url === siteConfig.siteUrl ? '1.0' : '0.8'}</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`;

  // Write sitemap to public directory
  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated at public/sitemap.xml');
}

generateSites().catch(console.error);
