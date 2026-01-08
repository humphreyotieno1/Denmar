import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { createAuditLog } from "@/lib/audit"
import { z } from "zod"

const destinationSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    countryId: z.string().min(1),
    heroImage: z.string().min(1),
    images: z.array(z.string()).min(1),
    summary: z.string().min(1),
    description: z.string().min(1),
    priceFrom: z.number().min(0),
    priceTo: z.number().optional().nullable(),
    bestTime: z.string().min(1),
    duration: z.string().min(1),
    featured: z.boolean().default(false),
    isActive: z.boolean().default(true),
    order: z.number().default(0),
    latitude: z.number().optional().nullable(),
    longitude: z.number().optional().nullable(),
    tags: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
})

// GET all destinations
export async function GET() {
    try {
        const destinations = await prisma.destination.findMany({
            orderBy: [
                { country: { name: "asc" } },
                { order: "asc" },
                { name: "asc" }
            ],
            include: {
                country: { select: { name: true } },
            },
        })

        return NextResponse.json(destinations)
    } catch (error) {
        console.error("Error fetching destinations:", error)
        return NextResponse.json(
            { message: "Failed to fetch destinations" },
            { status: 500 }
        )
    }
}

// POST create destination
export async function POST(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const validatedData = destinationSchema.parse(body)

        // Check for duplicate slug
        const existing = await prisma.destination.findUnique({
            where: { slug: validatedData.slug },
        })

        if (existing) {
            return NextResponse.json(
                { message: "A destination with this slug already exists" },
                { status: 400 }
            )
        }

        const destination = await prisma.destination.create({
            data: validatedData,
        })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "create",
            entityType: "destination",
            entityId: destination.id,
            entityName: destination.name,
            newData: destination,
        })

        return NextResponse.json(destination, { status: 201 })
    } catch (error) {
        console.error("Error creating destination:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to create destination" },
            { status: 500 }
        )
    }
}
