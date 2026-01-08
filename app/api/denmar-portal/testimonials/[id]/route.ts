import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { createAuditLog } from "@/lib/audit"
import { z } from "zod"

const testimonialSchema = z.object({
    name: z.string().min(1),
    location: z.string().optional().nullable(),
    trip: z.string().optional().nullable(),
    content: z.string().min(1),
    rating: z.number().min(1).max(5),
    image: z.string().optional().nullable(),
    source: z.string().min(1).default("Facebook"),
    featured: z.boolean().default(false),
    isActive: z.boolean().default(true),
    order: z.number().default(0),
})

interface RouteParams {
    params: Promise<{ id: string }>
}

// GET single testimonial
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        const testimonial = await prisma.testimonial.findUnique({
            where: { id },
        })

        if (!testimonial) {
            return NextResponse.json({ message: "Testimonial not found" }, { status: 404 })
        }

        return NextResponse.json(testimonial)
    } catch (error) {
        console.error("Error fetching testimonial:", error)
        return NextResponse.json(
            { message: "Failed to fetch testimonial" },
            { status: 500 }
        )
    }
}

// PUT update testimonial
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const body = await request.json()
        const validatedData = testimonialSchema.parse(body)

        // Get existing testimonial for audit log
        const existing = await prisma.testimonial.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ message: "Testimonial not found" }, { status: 404 })
        }

        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: validatedData,
        })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "update",
            entityType: "testimonial",
            entityId: testimonial.id,
            entityName: testimonial.name,
            oldData: existing,
            newData: testimonial,
        })

        return NextResponse.json(testimonial)
    } catch (error) {
        console.error("Error updating testimonial:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to update testimonial" },
            { status: 500 }
        )
    }
}

// DELETE testimonial
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

        // Get existing testimonial for audit log
        const existing = await prisma.testimonial.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ message: "Testimonial not found" }, { status: 404 })
        }

        await prisma.testimonial.delete({ where: { id } })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "delete",
            entityType: "testimonial",
            entityId: id,
            entityName: existing.name,
            oldData: existing,
        })

        return NextResponse.json({ message: "Testimonial deleted" })
    } catch (error) {
        console.error("Error deleting testimonial:", error)
        return NextResponse.json(
            { message: "Failed to delete testimonial" },
            { status: 500 }
        )
    }
}
