import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { createAuditLog } from "@/lib/audit"
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

interface RouteParams {
    params: Promise<{ id: string }>
}

// GET single service
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        const service = await prisma.service.findUnique({
            where: { id },
        })

        if (!service) {
            return NextResponse.json({ message: "Service not found" }, { status: 404 })
        }

        return NextResponse.json(service)
    } catch (error) {
        console.error("Error fetching service:", error)
        return NextResponse.json(
            { message: "Failed to fetch service" },
            { status: 500 }
        )
    }
}

// PUT update service
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const body = await request.json()
        const validatedData = serviceSchema.parse(body)

        // Get existing service for audit log
        const existing = await prisma.service.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ message: "Service not found" }, { status: 404 })
        }

        // Check for duplicate slug (excluding current)
        const duplicateSlug = await prisma.service.findFirst({
            where: {
                slug: validatedData.slug,
                NOT: { id },
            },
        })

        if (duplicateSlug) {
            return NextResponse.json(
                { message: "A service with this slug already exists" },
                { status: 400 }
            )
        }

        const service = await prisma.service.update({
            where: { id },
            data: {
                ...validatedData,
                features: validatedData.features as any,
            },
        })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "update",
            entityType: "service",
            entityId: service.id,
            entityName: service.name,
            oldData: existing,
            newData: service,
        })

        return NextResponse.json(service)
    } catch (error) {
        console.error("Error updating service:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to update service" },
            { status: 500 }
        )
    }
}

// DELETE service
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

        // Get existing service for audit log
        const existing = await prisma.service.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ message: "Service not found" }, { status: 404 })
        }

        await prisma.service.delete({ where: { id } })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "delete",
            entityType: "service",
            entityId: id,
            entityName: existing.name,
            oldData: existing,
        })

        return NextResponse.json({ message: "Service deleted" })
    } catch (error) {
        console.error("Error deleting service:", error)
        return NextResponse.json(
            { message: "Failed to delete service" },
            { status: 500 }
        )
    }
}
