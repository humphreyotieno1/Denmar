import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { createAuditLog } from "@/lib/audit"
import { revalidatePublicPages } from "@/lib/revalidate"
import { z } from "zod"

const countrySchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    heroImage: z.string().min(1),
    summary: z.string().min(1),
    description: z.string().min(1),
    region: z.string().min(1),
    popularDestinations: z.number().default(0),
    featured: z.boolean().default(false),
    isActive: z.boolean().default(true),
    order: z.number().default(0),
})

// GET all countries
export async function GET() {
    try {
        const countryModel: any = prisma.country
        const countries = await countryModel.findMany({
            orderBy: [{ order: "asc" }, { name: "asc" }],
            include: {
                _count: { select: { destinations: true } },
            },
        })

        return NextResponse.json(countries)
    } catch (error) {
        console.error("Error fetching countries:", error)
        return NextResponse.json(
            { message: "Failed to fetch countries" },
            { status: 500 }
        )
    }
}

// POST create country
export async function POST(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const validatedData = countrySchema.parse(body)

        const countryModel: any = prisma.country

        // Check for duplicate slug
        const existing = await countryModel.findUnique({
            where: { slug: validatedData.slug },
        })

        if (existing) {
            return NextResponse.json(
                { message: "A country with this slug already exists" },
                { status: 400 }
            )
        }

        const country = await countryModel.create({
            data: validatedData,
        })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "create",
            entityType: "country",
            entityId: country.id,
            entityName: country.name,
            newData: country,
        })

        // Revalidate cache
        revalidatePublicPages()

        return NextResponse.json(country, { status: 201 })
    } catch (error) {
        console.error("Error creating country:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to create country" },
            { status: 500 }
        )
    }
}
