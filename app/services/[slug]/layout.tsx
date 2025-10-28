import { getServiceBySlug } from "@/lib/services"
import type { Metadata } from "next"

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  
  if (!service) {
    return {
      title: "Travel Service - Denmar Tours & Travel",
      description: "Discover our comprehensive travel services.",
    }
  }

  return {
    title: `${service.name} - Travel Service | Denmar Travel`,
    description: `${service.description}. Professional ${service.name} services for your travel needs. Contact Denmar Tours & Travel.`,
    keywords: `${service.name}, travel services, ${service.category} services, ${service.name} Kenya, professional travel assistance`,
    openGraph: {
      title: `${service.name} - Travel Service`,
      description: service.description,
      images: [service.image || "/tablogo.png"],
    },
  }
}

export default function ServiceDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

