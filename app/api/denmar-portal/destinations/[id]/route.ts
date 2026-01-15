import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { createAuditLog } from "@/lib/audit"
import { revalidatePublicPages } from "@/lib/revalidate"
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

interface RouteParams {
    params: Promise<{ id: string }>
}

// GET single destination
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        const destination = await prisma.destination.findUnique({
            where: { id },
            include: {
                country: { select: { name: true, slug: true } },
            },
        })

        if (!destination) {
            return NextResponse.json({ message: "Destination not found" }, { status: 404 })
        }

        return NextResponse.json(destination)
    } catch (error) {
        console.error("Error fetching destination:", error)
        return NextResponse.json(
            { message: "Failed to fetch destination" },
            { status: 500 }
        )
    }
}

// PUT update destination
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const body = await request.json()
        const validatedData = destinationSchema.parse(body)

        // Get existing destination for audit log
        const existing = await prisma.destination.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ message: "Destination not found" }, { status: 404 })
        }

        // Check for duplicate slug (excluding current)
        const duplicateSlug = await prisma.destination.findFirst({
            where: {
                slug: validatedData.slug,
                NOT: { id },
            },
        })

        if (duplicateSlug) {
            return NextResponse.json(
                { message: "A destination with this slug already exists" },
                { status: 400 }
            )
        }

        const destination = await prisma.destination.update({
            where: { id },
            data: validatedData,
        })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "update",
            entityType: "destination",
            entityId: destination.id,
            entityName: destination.name,
            oldData: existing,
            newData: destination,
        })

        // Revalidate public pages
        revalidatePublicPages()

        return NextResponse.json(destination)
    } catch (error) {
        console.error("Error updating destination:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to update destination" },
            { status: 500 }
        )
    }
}

// DELETE destination
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        // Only admin can delete
        if (session.user.role !== "admin") {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 })
        }

        const { id } = await params

        // Get existing destination for audit log
        const existing = await prisma.destination.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ message: "Destination not found" }, { status: 404 })
        }

        await prisma.destination.delete({ where: { id } })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "delete",
            entityType: "destination",
            entityId: id,
            entityName: existing.name,
            oldData: existing,
        })

        // Revalidate public pages
        revalidatePublicPages()

        return NextResponse.json({ message: "Destination deleted" })
    } catch (error) {
        console.error("Error deleting destination:", error)
        return NextResponse.json(
            { message: "Failed to delete destination" },
            { status: 500 }
        )
    }
}
