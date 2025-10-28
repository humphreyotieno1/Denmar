import { getPackageBySlug } from "@/lib/services"
import type { Metadata } from "next"

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const packageData = getPackageBySlug(slug)
  
  if (!packageData) {
    return {
      title: "Travel Package - Denmar Tours & Travel",
      description: "Explore amazing travel packages with Denmar Tours & Travel.",
    }
  }

  return {
    title: `${packageData.name} - Travel Package | Denmar Travel`,
    description: `${packageData.shortDescription}. Duration: ${packageData.duration}. Price: ${packageData.price}. Book with Denmar Tours & Travel.`,
    keywords: `${packageData.name}, ${packageData.destination} travel packages, ${packageData.category} packages, ${packageData.duration} trips, ${packageData.country} holidays`,
    openGraph: {
      title: `${packageData.name} - Travel Package`,
      description: packageData.shortDescription,
      images: [packageData.heroImage || "/tablogo.png"],
    },
  }
}

export default function PackageDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

