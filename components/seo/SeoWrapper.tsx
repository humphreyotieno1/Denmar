import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import seoConfig from '@/app/seo.config';
import Script from 'next/script';

interface SeoWrapperProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  article?: boolean;
  schema?: any;
  children: React.ReactNode;
}

export default function SeoWrapper({
  title,
  description,
  canonical,
  image,
  article = false,
  schema,
  children,
}: SeoWrapperProps) {
  const router = useRouter();
  const currentUrl = `${seoConfig.canonical}${router.asPath}`;

  // Organization schema as a JSON string to avoid type issues
  const organizationSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${seoConfig.canonical}#organization`,
    name: 'Denmar Tours & Travel',
    url: seoConfig.canonical,
    logo: `${seoConfig.canonical}/images/logo.png`,
    sameAs: [
      'https://www.facebook.com/denmartravel',
      'https://www.instagram.com/denmar_travel',
      'https://x.com/DenmarTravel',
      'https://www.youtube.com/c/dennisGathitu/videos',
      'https://www.tiktok.com/@denmar_travel'
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+254 114 320 486',
        contactType: 'customer service',
        email: 'info@denmartravel.co.ke',
        areaServed: 'KE',
        availableLanguage: ['English', 'Swahili'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3rd Floor Office - Design Center Building\nTausi Road',
      addressLocality: 'Westlands',
      addressRegion: 'Nairobi, Kenya',
      postalCode: '00100',
      addressCountry: 'KE',
    },
  });

  // Website schema as a JSON string
  const websiteSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${seoConfig.canonical}#website`,
    url: seoConfig.canonical,
    name: 'Denmar Tours & Travel',
    description: seoConfig.description,
  });

  // WebPage schema as a JSON string
  const webPageSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${currentUrl}#webpage`,
    url: currentUrl,
    inLanguage: 'en-US',
    name: title || seoConfig.defaultTitle,
    description: description || seoConfig.description,
  });

  return (
    <>
      <NextSeo
        title={title}
        description={description || seoConfig.description}
        canonical={canonical || currentUrl}
        openGraph={{
          ...seoConfig.openGraph,
          url: canonical || currentUrl,
          title: title || seoConfig.defaultTitle,
          description: description || seoConfig.description,
          ...(image && {
            images: [
              {
                url: image,
                width: 1200,
                height: 630,
                alt: title || 'Denmar Tours & Travel',
              },
            ],
          }),
          ...(article && {
            type: 'article',
          }),
        }}
        additionalMetaTags={[
          {
            property: 'dc:creator',
            content: 'Denmar Tours & Travel',
          },
          {
            name: 'application-name',
            content: 'Denmar Tours & Travel',
          },
        ]}
      />

      {/* Schema.org JSON-LD */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: organizationSchema }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: websiteSchema }}
      />
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webPageSchema }}
      />
      
      {/* Additional custom schema */}
      {schema && (
        <Script
          id="custom-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      {children}
    </>
  );
}
