import { getDealBySlug } from "@/lib/services"
import type { Metadata } from "next"

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const deal = getDealBySlug(slug)
  
  if (!deal) {
    return {
      title: "Special Travel Deals - Denmar Tours & Travel",
      description: "Discover exclusive travel deals and special offers from Denmar Tours & Travel.",
    }
  }

  return {
    title: `${deal.title} - Special Offer | Denmar Travel`,
    description: `${deal.shortDescription}. ${deal.description.substring(0, 100)}... Save ${deal.discount}% on ${deal.title} with Denmar Tours & Travel.`,
    keywords: `${deal.title}, ${deal.category} deals, travel offers, ${deal.destinations.join(', ')} travel deals, special offers, ${deal.discount}% discount`,
    openGraph: {
      title: `${deal.title} - Special Offer`,
      description: deal.shortDescription,
      images: [deal.image || "/tablogo.png"],
    },
  }
}

export default function DealDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

