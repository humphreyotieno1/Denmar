import Script from "next/script"

export function FooterSchema() {
  const organizationSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": "https://denmartravel.co.ke/#organization",
    name: "Denmar Tours & Travel",
    alternateName: "Denmar Travel",
    url: "https://denmartravel.co.ke",
    logo: "https://denmartravel.co.ke/denmar.png",
    description: "Your trusted travel partner for unforgettable adventures. We create personalized travel experiences across Kenya, Africa, and the world.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3rd Floor Office - Design Center Building, Tausi Road",
      addressLocality: "Westlands",
      addressRegion: "Nairobi",
      postalCode: "00100",
      addressCountry: "KE",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+254793041888",
        contactType: "customer service",
        email: "info@denmartravel.co.ke",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Swahili"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/denmartravel",
      "https://www.instagram.com/denmar_travel",
      "https://x.com/DenmarTravel",
      "https://www.youtube.com/c/dennisGathitu/videos",
      "https://www.tiktok.com/@denmar_travel",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    priceRange: "$$",
    foundingDate: "2015",
  })

  return <Script id="footer-organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationSchema }} />
}

