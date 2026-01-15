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

interface RouteParams {
    params: Promise<{ id: string }>
}

// GET single country
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        const countryModel: any = prisma.country
        const country = await countryModel.findUnique({
            where: { id },
            include: {
                destinations: {
                    orderBy: [{ order: "asc" }, { name: "asc" }],
                },
            },
        })

        if (!country) {
            return NextResponse.json({ message: "Country not found" }, { status: 404 })
        }

        return NextResponse.json(country)
    } catch (error) {
        console.error("Error fetching country:", error)
        return NextResponse.json(
            { message: "Failed to fetch country" },
            { status: 500 }
        )
    }
}

// PUT update country
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const body = await request.json()
        const validatedData = countrySchema.parse(body)

        const countryModel: any = prisma.country

        // Get existing country for audit log
        const existing = await countryModel.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ message: "Country not found" }, { status: 404 })
        }

        // Check for duplicate slug (excluding current)
        const duplicateSlug = await countryModel.findFirst({
            where: {
                slug: validatedData.slug,
                NOT: { id },
            },
        })

        if (duplicateSlug) {
            return NextResponse.json(
                { message: "A country with this slug already exists" },
                { status: 400 }
            )
        }

        const country = await countryModel.update({
            where: { id },
            data: validatedData,
        })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "update",
            entityType: "country",
            entityId: country.id,
            entityName: country.name,
            oldData: existing,
            newData: country,
        })

        // Revalidate cache
        revalidatePublicPages()

        return NextResponse.json(country)
    } catch (error) {
        console.error("Error updating country:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to update country" },
            { status: 500 }
        )
    }
}

// DELETE country
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

        const countryModel: any = prisma.country

        // Get existing country for audit log
        const existing = await countryModel.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ message: "Country not found" }, { status: 404 })
        }

        // Delete country (destinations will cascade delete)
        await countryModel.delete({ where: { id } })

        // Revalidate cache
        revalidatePublicPages()

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "delete",
            entityType: "country",
            entityId: id,
            entityName: existing.name,
            oldData: existing,
        })

        return NextResponse.json({ message: "Country deleted" })
    } catch (error) {
        console.error("Error deleting country:", error)
        return NextResponse.json(
            { message: "Failed to delete country" },
            { status: 500 }
        )
    }
}
