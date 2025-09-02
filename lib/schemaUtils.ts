/**
 * Generates schema.org JSON-LD for a travel destination
 */
export function generateDestinationSchema({
  name,
  description,
  url,
  image,
  address,
  geo,
  priceRange = '$$$',
  rating,
  reviewCount,
  offers,
}: {
  name: string;
  description: string;
  url: string;
  image: string | string[];
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  priceRange?: string;
  rating?: {
    ratingValue: number;
    bestRating?: number;
    worstRating?: number;
    ratingCount: number;
  };
  reviewCount?: number;
  offers?: {
    price: string;
    priceCurrency: string;
    availability?: string;
    url?: string;
    validFrom?: string;
  }[];
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name,
    description,
    url,
    image: Array.isArray(image) ? image : [image],
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
  };

  if (geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    };
  }

  if (priceRange) {
    schema.priceRange = priceRange;
  }

  if (rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating.ratingValue,
      bestRating: rating.bestRating || 5,
      worstRating: rating.worstRating || 1,
      ratingCount: rating.ratingCount,
    };
  }

  if (reviewCount) {
    schema.reviewCount = reviewCount;
  }

  if (offers && offers.length > 0) {
    schema.offers = offers.map(offer => ({
      '@type': 'Offer',
      price: offer.price,
      priceCurrency: offer.priceCurrency || 'USD',
      availability: offer.availability || 'https://schema.org/InStock',
      url: offer.url || url,
      validFrom: offer.validFrom || new Date().toISOString().split('T')[0],
    }));
  }

  return JSON.stringify(schema);
}

/**
 * Generates FAQ schema for a page
 */
export function generateFaqSchema(questions: Array<{ question: string; answer: string }>) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return JSON.stringify(schema);
}

/**
 * Generates breadcrumb schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return JSON.stringify(schema);
}
