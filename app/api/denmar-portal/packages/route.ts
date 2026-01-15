import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { createAuditLog } from "@/lib/audit"
import { revalidatePublicPages } from "@/lib/revalidate"
import { z } from "zod"

const itineraryDaySchema = z.object({
    day: z.number().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    meals: z.string().optional().nullable(),
    accommodation: z.string().optional().nullable(),
    activity: z.string().optional().nullable(),
})

const packageSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    destinationSlug: z.string().min(1),
    country: z.string().min(1),
    description: z.string().min(1),
    shortDescription: z.string().min(1),
    duration: z.string().min(1),
    price: z.string().min(1),
    includes: z.array(z.string()).min(1),
    excludes: z.array(z.string()).min(1),
    terms: z.array(z.string()).default([]),
    itinerary: z.array(itineraryDaySchema).min(1),
    image: z.string().min(1),
    category: z.string().min(1),
    bestTime: z.string().nullable().optional().transform(v => v || "All year round"),
    featured: z.boolean().default(false),
    isActive: z.boolean().default(true),
    order: z.number().default(0),
})

// GET all packages
export async function GET() {
    try {
        const packageModel: any = prisma.package
        const packages = await packageModel.findMany({
            orderBy: [
                { country: "asc" },
                { order: "asc" },
                { name: "asc" }
            ],
        })

        return NextResponse.json(packages)
    } catch (error) {
        console.error("Error fetching packages:", error)
        return NextResponse.json(
            { message: "Failed to fetch packages" },
            { status: 500 }
        )
    }
}

// POST create package
export async function POST(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const validatedData = packageSchema.parse(body)

        const packageModel: any = prisma.package

        // Check for duplicate slug
        const existing = await packageModel.findUnique({
            where: { slug: validatedData.slug },
        })

        if (existing) {
            return NextResponse.json(
                { message: "A package with this slug already exists" },
                { status: 400 }
            )
        }

        const pkg = await packageModel.create({
            data: {
                ...validatedData,
                bestTime: validatedData.bestTime,
                includes: (validatedData as any).includes,
                excludes: (validatedData as any).excludes,
                terms: (validatedData as any).terms,
                itinerary: (validatedData as any).itinerary,
            },
        })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "create",
            entityType: "package",
            entityId: pkg.id,
            entityName: pkg.name,
            newData: pkg,
        })

        // Revalidate public pages
        revalidatePublicPages()

        return NextResponse.json(pkg, { status: 201 })
    } catch (error) {
        console.error("Error creating package:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to create package" },
            { status: 500 }
        )
    }
}
