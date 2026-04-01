import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kenya Safari & Holiday Packages | Affordable Deals – Denmar",
  description: "Browse Kenya safaris, Dubai packages from Kenya, Zanzibar holidays & more. Flexible dates, expert support. Check availability & get your custom travel quote today.",
  keywords: "Kenya safari packages, Dubai packages from Kenya, Zanzibar packages from Kenya, Masai Mara safari packages, Diani beach holiday packages, Amboseli safari packages Nairobi, affordable Kenya tours, Tanzania packages from Kenya, beach holiday packages Kenya, customised travel packages Nairobi",
  openGraph: {
    title: "Kenya Safari & Holiday Packages | Affordable Deals – Denmar Travel",
    description: "Browse Kenya safaris, Dubai packages from Kenya, Zanzibar holidays & more. Flexible dates & expert support. Get your custom travel quote today.",
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

