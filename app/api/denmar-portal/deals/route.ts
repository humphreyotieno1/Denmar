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

// GET all deals
export async function GET() {
    try {
        const deals = await prisma.deal.findMany({
            orderBy: [
                { validUntil: "asc" },
                { title: "asc" }
            ],
        })

        return NextResponse.json(deals)
    } catch (error) {
        console.error("Error fetching deals:", error)
        return NextResponse.json(
            { message: "Failed to fetch deals" },
            { status: 500 }
        )
    }
}

// POST create deal
export async function POST(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const validatedData = dealSchema.parse(body)

        // Check for duplicate slug
        const existing = await prisma.deal.findUnique({
            where: { slug: validatedData.slug },
        })

        if (existing) {
            return NextResponse.json(
                { message: "A deal with this slug already exists" },
                { status: 400 }
            )
        }

        const deal = await prisma.deal.create({
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
            action: "create",
            entityType: "deal",
            entityId: deal.id,
            entityName: deal.title,
            newData: deal,
        })

        return NextResponse.json(deal, { status: 201 })
    } catch (error) {
        console.error("Error creating deal:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to create deal" },
            { status: 500 }
        )
    }
}
