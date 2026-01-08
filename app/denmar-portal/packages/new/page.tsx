import { prisma } from "@/lib/db"
import { PackageForm } from "../package-form"

export default async function NewPackagePage() {
    const destinations = await prisma.destination.findMany({
        orderBy: { name: "asc" },
        select: {
            slug: true,
            name: true,
            country: {
                select: { name: true }
            }
        }
    })

    const formattedDestinations = destinations.map(d => ({
        slug: d.slug,
        name: d.name,
        countryName: d.country.name
    }))

    return <PackageForm mode="create" destinations={formattedDestinations} />
}
