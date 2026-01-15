import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { createAuditLog } from "@/lib/audit"
import { revalidatePublicPages } from "@/lib/revalidate"
import { z } from "zod"

const serviceSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().min(1),
    shortDescription: z.string().min(1),
    icon: z.string().min(1),
    features: z.array(z.string()).default([]),
    price: z.string().optional().nullable(),
    duration: z.string().optional().nullable(),
    category: z.string().min(1),
    featured: z.boolean().default(false),
    isActive: z.boolean().default(true),
    order: z.number().default(0),
    image: z.string().optional().nullable(),
})

// GET all services
export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: [
                { order: "asc" },
                { name: "asc" }
            ],
        })

        return NextResponse.json(services)
    } catch (error) {
        console.error("Error fetching services:", error)
        return NextResponse.json(
            { message: "Failed to fetch services" },
            { status: 500 }
        )
    }
}

// POST create service
export async function POST(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const validatedData = serviceSchema.parse(body)

        // Check for duplicate slug
        const existing = await prisma.service.findUnique({
            where: { slug: validatedData.slug },
        })

        if (existing) {
            return NextResponse.json(
                { message: "A service with this slug already exists" },
                { status: 400 }
            )
        }

        const service = await prisma.service.create({
            data: {
                ...validatedData,
                features: validatedData.features as any,
            },
        })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "create",
            entityType: "service",
            entityId: service.id,
            entityName: service.name,
            newData: service,
        })

        // Revalidate public pages
        revalidatePublicPages()

        return NextResponse.json(service, { status: 201 })
    } catch (error) {
        console.error("Error creating service:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to create service" },
            { status: 500 }
        )
    }
}
