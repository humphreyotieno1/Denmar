import { DefaultSeoProps } from 'next-seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://denmartravel.co.ke';

const title = 'Denmar Tours & Travel | Your Trusted Travel Partner';
const description = 'Experience unforgettable journeys with Denmar Tours & Travel. We offer customized travel packages, safaris, and tours across Kenya and beyond.';

const seoConfig: DefaultSeoProps = {
  titleTemplate: '%s | Denmar Tours & Travel',
  defaultTitle: title,
  description: description,
  canonical: siteUrl,
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: siteUrl,
    siteName: 'Denmar Tours & Travel',
    title: title,
    description: description,
    images: [
      {
        url: `${siteUrl}/denmar.png`,
        width: 1200,
        height: 630,
        alt: 'Denmar Tours & Travel',
      },
    ],
  },
  twitter: {
    handle: '@DenmarTravel',
    site: '@DenmarTravel',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'theme-color',
      content: '#ffffff',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/denmar.png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/denmar.png',
      sizes: '180x180',
    },
  ],
};

export default seoConfig;
