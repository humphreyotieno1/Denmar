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

        // Search across multiple entities in parallel
        const [packages, destinations, deals, services] = await Promise.all([
            prisma.package.findMany({
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
            prisma.destination.findMany({
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
            prisma.deal.findMany({
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
            prisma.service.findMany({
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
            ...packages.map((p: { id: string; name: string; slug: string; country: string }) => ({
                id: p.id,
                type: "package" as const,
                title: p.name,
                subtitle: p.country,
                href: `/denmar-portal/packages/${p.id}`,
            })),
            ...destinations.map((d: { id: string; name: string; slug: string }) => ({
                id: d.id,
                type: "destination" as const,
                title: d.name,
                subtitle: d.slug,
                href: `/denmar-portal/destinations/${d.id}`,
            })),
            ...deals.map((d: { id: string; title: string; slug: string }) => ({
                id: d.id,
                type: "deal" as const,
                title: d.title,
                subtitle: d.slug,
                href: `/denmar-portal/deals/${d.id}`,
            })),
            ...services.map((s: { id: string; name: string; slug: string }) => ({
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
