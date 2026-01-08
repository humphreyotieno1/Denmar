import { prisma } from "@/lib/db"
import { headers } from "next/headers"

export type AuditAction = "create" | "update" | "delete"

export type AuditEntityType =
    | "country"
    | "destination"
    | "package"
    | "deal"
    | "service"
    | "hero_slide"
    | "testimonial"
    | "site_settings"
    | "deals_popup"
    | "admin_user"

interface CreateAuditLogParams {
    userId: string
    action: AuditAction
    entityType: AuditEntityType
    entityId: string
    entityName?: string
    oldData?: Record<string, any> | null
    newData?: Record<string, any> | null
}

export async function createAuditLog({
    userId,
    action,
    entityType,
    entityId,
    entityName,
    oldData,
    newData,
}: CreateAuditLogParams) {
    try {
        const headersList = await headers()
        const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown"
        const userAgent = headersList.get("user-agent") || undefined

        await prisma.auditLog.create({
            data: {
                userId,
                action,
                entityType,
                entityId,
                entityName,
                oldData: oldData ? JSON.parse(JSON.stringify(oldData)) : null,
                newData: newData ? JSON.parse(JSON.stringify(newData)) : null,
                ipAddress,
                userAgent,
            },
        })
    } catch (error) {
        console.error("Failed to create audit log:", error)
        // Don't throw - audit logging should not break the main operation
    }
}

export async function getRecentAuditLogs(limit: number = 20) {
    return prisma.auditLog.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
        },
    })
}

export async function getAuditLogsForEntity(entityType: AuditEntityType, entityId: string) {
    return prisma.auditLog.findMany({
        where: {
            entityType,
            entityId,
        },
        orderBy: { createdAt: "desc" },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
        },
    })
}

export function formatAuditAction(action: AuditAction): string {
    return {
        create: "Created",
        update: "Updated",
        delete: "Deleted",
    }[action]
}

export function formatEntityType(entityType: AuditEntityType): string {
    return {
        country: "Country",
        destination: "Destination",
        package: "Package",
        deal: "Deal",
        service: "Service",
        hero_slide: "Hero Slide",
        testimonial: "Testimonial",
        site_settings: "Site Settings",
        deals_popup: "Deals Popup",
        admin_user: "Admin User",
    }[entityType]
}
