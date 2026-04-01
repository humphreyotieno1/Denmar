import { prisma } from "@/lib/db"
import type { Metadata } from "next"

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const modelPackage: any = prisma.package
  const packageData = await modelPackage.findUnique({
    where: { slug }
  })

  if (!packageData) {
    return {
      title: "Travel Package - Denmar Tours & Travel",
      description: "Explore amazing travel packages with Denmar Tours & Travel.",
    }
  }

  // Build a conversion-focused title (≤65 chars)
  const destLabel = packageData.destinationSlug
    ? packageData.destinationSlug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
    : ""
  const countryCode = (packageData.countryShortCode || "").toUpperCase()

  const title = destLabel
    ? `${packageData.name} | ${destLabel} Packages from Kenya – Denmar`
    : `${packageData.name} | Affordable Travel Package – Denmar`

  const description = `${packageData.shortDescription}. ${packageData.duration} trip from ${countryCode || "Kenya"}. From ${packageData.price} per person. Check availability & get your quote today.`

  const keywords = [
    packageData.name,
    destLabel ? `${destLabel} packages from Kenya` : "",
    destLabel ? `${destLabel} travel packages Nairobi` : "",
    destLabel ? `${destLabel} holiday cost from Kenya` : "",
    `${packageData.category} packages`,
    `${packageData.duration} ${destLabel || packageData.category} trip`,
    countryCode ? `${countryCode} holiday packages` : "",
    "affordable travel packages Kenya",
    "Denmar travel packages",
  ].filter(Boolean).join(", ")

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
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

