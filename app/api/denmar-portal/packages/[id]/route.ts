import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { createAuditLog } from "@/lib/audit"
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
    bestTime: z.string().optional().nullable(),
    featured: z.boolean().default(false),
    isActive: z.boolean().default(true),
    order: z.number().default(0),
})

interface RouteParams {
    params: Promise<{ id: string }>
}

// GET single package
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        const pkg = await prisma.package.findUnique({
            where: { id },
        })

        if (!pkg) {
            return NextResponse.json({ message: "Package not found" }, { status: 404 })
        }

        return NextResponse.json(pkg)
    } catch (error) {
        console.error("Error fetching package:", error)
        return NextResponse.json(
            { message: "Failed to fetch package" },
            { status: 500 }
        )
    }
}

// PUT update package
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const body = await request.json()
        const validatedData = packageSchema.parse(body)

        // Get existing package for audit log
        const existing = await prisma.package.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ message: "Package not found" }, { status: 404 })
        }

        // Check for duplicate slug (excluding current)
        const duplicateSlug = await prisma.package.findFirst({
            where: {
                slug: validatedData.slug,
                NOT: { id },
            },
        })

        if (duplicateSlug) {
            return NextResponse.json(
                { message: "A package with this slug already exists" },
                { status: 400 }
            )
        }

        const pkg = await prisma.package.update({
            where: { id },
            data: {
                ...validatedData,
                includes: validatedData.includes as any,
                excludes: validatedData.excludes as any,
                terms: validatedData.terms as any,
                itinerary: validatedData.itinerary as any,
            },
        })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "update",
            entityType: "package",
            entityId: pkg.id,
            entityName: pkg.name,
            oldData: existing,
            newData: pkg,
        })

        return NextResponse.json(pkg)
    } catch (error) {
        console.error("Error updating package:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to update package" },
            { status: 500 }
        )
    }
}

// DELETE package
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

        // Get existing package for audit log
        const existing = await prisma.package.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ message: "Package not found" }, { status: 404 })
        }

        await prisma.package.delete({ where: { id } })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "delete",
            entityType: "package",
            entityId: id,
            entityName: existing.name,
            oldData: existing,
        })

        return NextResponse.json({ message: "Package deleted" })
    } catch (error) {
        console.error("Error deleting package:", error)
        return NextResponse.json(
            { message: "Failed to delete package" },
            { status: 500 }
        )
    }
}
