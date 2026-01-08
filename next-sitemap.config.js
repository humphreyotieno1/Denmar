// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.denmartravel.co.ke/',
//   generateRobotsTxt: true,
//   generateIndexSitemap: true,
//   exclude: ['/server-sitemap.xml', '/admin/*'],
//   robotsTxtOptions: {
//     policies: [
//       {
//         userAgent: '*',
//         allow: '/',
//       },
//     ],
//   },
//   // Add additional paths that should be included in the sitemap
//   additionalPaths: async (config) => [
//     await config.transform(config, '/about'),
//     await config.transform(config, '/contact'),
//     await config.transform(config, '/deals'),
//     await config.transform(config, '/destinations'),
//     await config.transform(config, '/services'),
//   ],
// }


/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.denmartravel.co.ke',
  generateRobotsTxt: true,
  generateIndexSitemap: false,   // 👈 keeps all URLs in one sitemap.xml
  exclude: ['/api/*', '/denmar-portal/*'], // optional: exclude system routes
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
