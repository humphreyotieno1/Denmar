import Script from "next/script"

export function FooterSchema() {
  const organizationSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": "https://denmartravel.co.ke/#organization",
    name: "Denmar Tours & Travel",
    alternateName: "Denmar Travel",
    url: "https://www.denmartravel.co.ke",
    logo: "https://www.denmartravel.co.ke/denmar.png",
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
        telephone: "+254113039737",
        contactType: "customer service",
        email: "info@denmartravel.co.ke",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Swahili"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+254113039737",
        contactType: "reservations",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Swahili"],
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "Kenya" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Tanzania" },
      { "@type": "Country", name: "Uganda" },
      { "@type": "Country", name: "Rwanda" },
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.denmartravel.co.ke/packages?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  })

  const websiteSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.denmartravel.co.ke/#website",
    url: "https://www.denmartravel.co.ke/",
    name: "Denmar Tours & Travel",
    description: "Affordable travel packages from Kenya — Dubai, Zanzibar, Maasai Mara safaris & more.",
    publisher: {
      "@id": "https://denmartravel.co.ke/#organization",
    },
    inLanguage: "en-KE",
  })

  return (
    <>
      <Script id="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationSchema }} />
      <Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteSchema }} />
    </>
  )
}
