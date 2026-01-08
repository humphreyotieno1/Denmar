import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { createAuditLog } from "@/lib/audit"
import { z } from "zod"

const dealSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().min(1),
    shortDescription: z.string().min(1),
    originalPrice: z.string().min(1),
    discountedPrice: z.string().min(1),
    discount: z.number().min(1).max(100),
    validUntil: z.string().min(1),
    destinations: z.array(z.string()).min(1),
    image: z.string().min(1),
    category: z.string().min(1),
    featured: z.boolean().default(false),
    isActive: z.boolean().default(true),
    order: z.number().default(0),
    terms: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
})

interface RouteParams {
    params: Promise<{ id: string }>
}

// GET single deal
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        const deal = await prisma.deal.findUnique({
            where: { id },
        })

        if (!deal) {
            return NextResponse.json({ message: "Deal not found" }, { status: 404 })
        }

        return NextResponse.json(deal)
    } catch (error) {
        console.error("Error fetching deal:", error)
        return NextResponse.json(
            { message: "Failed to fetch deal" },
            { status: 500 }
        )
    }
}

// PUT update deal
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const body = await request.json()
        const validatedData = dealSchema.parse(body)

        // Get existing deal for audit log
        const existing = await prisma.deal.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ message: "Deal not found" }, { status: 404 })
        }

        // Check for duplicate slug (excluding current)
        const duplicateSlug = await prisma.deal.findFirst({
            where: {
                slug: validatedData.slug,
                NOT: { id },
            },
        })

        if (duplicateSlug) {
            return NextResponse.json(
                { message: "A deal with this slug already exists" },
                { status: 400 }
            )
        }

        const deal = await prisma.deal.update({
            where: { id },
            data: {
                ...validatedData,
                validUntil: new Date(validatedData.validUntil),
                destinations: validatedData.destinations as any,
                terms: validatedData.terms as any,
                highlights: validatedData.highlights as any,
            },
        })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "update",
            entityType: "deal",
            entityId: deal.id,
            entityName: deal.title,
            oldData: existing,
            newData: deal,
        })

        return NextResponse.json(deal)
    } catch (error) {
        console.error("Error updating deal:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to update deal" },
            { status: 500 }
        )
    }
}

// DELETE deal
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

        // Get existing deal for audit log
        const existing = await prisma.deal.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ message: "Deal not found" }, { status: 404 })
        }

        await prisma.deal.delete({ where: { id } })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "delete",
            entityType: "deal",
            entityId: id,
            entityName: existing.title,
            oldData: existing,
        })

        return NextResponse.json({ message: "Deal deleted" })
    } catch (error) {
        console.error("Error deleting deal:", error)
        return NextResponse.json(
            { message: "Failed to delete deal" },
            { status: 500 }
        )
    }
}
