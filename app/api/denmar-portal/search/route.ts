import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"

// GET search across all content types
export async function GET(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const query = searchParams.get("q")

        if (!query || query.length < 2) {
            return NextResponse.json({ results: [] })
        }

        const searchTerm = query.toLowerCase()

        const packageModel: any = prisma.package
        const destinationModel: any = prisma.destination
        const dealModel: any = prisma.deal
        const serviceModel: any = prisma.service
        const countryModel: any = (prisma as any).country

        // Search across multiple entities in parallel
        const [packages, destinations, deals, services, countries] = await Promise.all([
            packageModel.findMany({
                where: {
                    OR: [
                        { name: { contains: searchTerm, mode: "insensitive" } },
                        { slug: { contains: searchTerm, mode: "insensitive" } },
                        { country: { contains: searchTerm, mode: "insensitive" } },
                        { destinationSlug: { contains: searchTerm, mode: "insensitive" } },
                    ],
                },
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    country: true,
                },
                take: 5,
            }),
            destinationModel.findMany({
                where: {
                    OR: [
                        { name: { contains: searchTerm, mode: "insensitive" } },
                        { slug: { contains: searchTerm, mode: "insensitive" } },
                    ],
                },
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
                take: 5,
            }),
            dealModel.findMany({
                where: {
                    OR: [
                        { title: { contains: searchTerm, mode: "insensitive" } },
                        { slug: { contains: searchTerm, mode: "insensitive" } },
                    ],
                },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                },
                take: 5,
            }),
            serviceModel.findMany({
                where: {
                    OR: [
                        { name: { contains: searchTerm, mode: "insensitive" } },
                        { slug: { contains: searchTerm, mode: "insensitive" } },
                    ],
                },
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
                take: 5,
            }),
            countryModel.findMany({
                where: {
                    OR: [
                        { name: { contains: searchTerm, mode: "insensitive" } },
                        { slug: { contains: searchTerm, mode: "insensitive" } },
                    ],
                },
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
                take: 5,
            }),
        ])

        // Format results with type and link
        const results = [
            ...packages.map((p: any) => ({
                id: p.id,
                type: "package" as const,
                title: p.name,
                subtitle: p.country,
                href: `/denmar-portal/packages/${p.id}`,
            })),
            ...destinations.map((d: any) => ({
                id: d.id,
                type: "destination" as const,
                title: d.name,
                subtitle: d.slug,
                href: `/denmar-portal/destinations/${d.id}`,
            })),
            ...countries.map((c: any) => ({
                id: c.id,
                type: "country" as const,
                title: c.name,
                subtitle: c.slug,
                href: `/denmar-portal/countries/${c.id}`,
            })),
            ...deals.map((d: any) => ({
                id: d.id,
                type: "deal" as const,
                title: d.title,
                subtitle: d.slug,
                href: `/denmar-portal/deals/${d.id}`,
            })),
            ...services.map((s: any) => ({
                id: s.id,
                type: "service" as const,
                title: s.name,
                subtitle: s.slug,
                href: `/denmar-portal/services/${s.id}`,
            })),
        ]

        return NextResponse.json({ results })
    } catch (error) {
        console.error("Error searching:", error)
        return NextResponse.json(
            { message: "Failed to search" },
            { status: 500 }
        )
    }
}
