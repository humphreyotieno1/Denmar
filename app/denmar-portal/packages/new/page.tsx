import { prisma } from "@/lib/db"
import { PackageForm } from "../package-form"

export default async function NewPackagePage() {
    const modelDestination: any = prisma.destination
    const destinations = await modelDestination.findMany({
        orderBy: { name: "asc" },
        select: {
            slug: true,
            name: true,
            country: {
                select: { name: true }
            }
        }
    })

    const formattedDestinations = destinations.map((d: any) => ({
        slug: d.slug,
        name: d.name,
        countryName: d.country.name
    }))

    return <PackageForm mode="create" destinations={formattedDestinations} />
}
