import Script from "next/script"

interface BreadcrumbItem {
  name: string
  url: string
}

interface FAQItem {
  question: string
  answer: string
}

interface ReviewItem {
  author: string
  rating: number
  reviewBody: string
  datePublished?: string
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  })

  return <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  })

  return <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
}

export function ReviewSchema({ reviews }: { reviews: ReviewItem[] }) {
  if (reviews.length === 0) return null

  const aggregateRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  const reviewCount = reviews.length

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Denmar Tours & Travel",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.toFixed(1),
      reviewCount: reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      datePublished: review.datePublished || new Date().toISOString(),
      reviewBody: review.reviewBody,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: "5",
        worstRating: "1",
      },
    })),
  })

  return <Script id="review-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
}

// Travel Package Schema
export function TravelPackageSchema({
  name,
  description,
  price,
  destination,
  duration,
  image,
  rating,
  offers,
}: {
  name: string
  description: string
  price: string
  destination: string
  duration: string
  image?: string
  rating: number
  offers?: Array<{ name: string; description: string }>
}) {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TravelAction",
    object: {
      "@type": "TouristTrip",
      name: name,
      description: description,
      image: image || "https://denmartravel.co.ke/tablogo.png",
      provider: {
        "@type": "TravelAgency",
        name: "Denmar Tours & Travel",
        url: "https://denmartravel.co.ke",
      },
      ...(offers && {
        includesAttraction: offers.map((offer) => ({
          "@type": "TouristAttraction",
          name: offer.name,
          description: offer.description,
        })),
      }),
    },
    agent: {
      "@type": "TravelAgency",
      name: "Denmar Tours & Travel",
    },
  })

  return <Script id="travel-package-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
}

