import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Travel Packages - Customized Holidays & Tours",
  description: "Browse our selection of travel packages including Kenya safaris, beach holidays, city breaks, and adventure tours. Tailored packages for every traveler.",
  keywords: "travel packages, Kenya safari packages, beach holiday packages, city break packages, tour packages, customized holidays, travel deals",
  openGraph: {
    title: "Travel Packages - Customized Holidays & Tours",
    description: "Browse our selection of travel packages. Tailored packages for every traveler.",
    images: ["/tablogo.png"],
  },
}

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

