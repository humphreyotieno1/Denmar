import { prisma } from "./db"

/**
 * Simple database-backed rate limiter for Prisma.
 * @param key The unique key for the rate limit (e.g. "contact-form:127.0.0.1")
 * @param limit The maximum number of requests allowed within the duration
 * @param durationSeconds The duration in seconds for the rate limit window
 * @returns Object with { success: boolean, remaining: number, reset: Date }
 */
export async function checkRateLimit(key: string, limit: number, durationSeconds: number) {
  const now = new Date()

  try {
    // Clean up expired entries occasionally (could be moved to a cron, but keeping it simple here)
    // We only clean up the current key if it's expired
    const existing = await prisma.rateLimit.findUnique({
      where: { key }
    })

    if (!existing || existing.expiresAt < now) {
      // Create new or reset expired
      const expiresAt = new Date(now.getTime() + durationSeconds * 1000)
      const record = await prisma.rateLimit.upsert({
        where: { key },
        create: {
          key,
          count: 1,
          expiresAt
        },
        update: {
          count: 1,
          expiresAt
        }
      })
      return { success: true, remaining: limit - 1, reset: record.expiresAt }
    }

    if (existing.count >= limit) {
      return { success: false, remaining: 0, reset: existing.expiresAt }
    }

    // Increment count
    const updated = await prisma.rateLimit.update({
      where: { key },
      data: {
        count: { increment: 1 }
      }
    })

    return { success: true, remaining: limit - updated.count, reset: updated.expiresAt }
  } catch (error) {
    console.error("Rate limit check failed:", error)
    // Fail open in case of DB issues to avoid blocking users
    return { success: true, remaining: 1, reset: now }
  }
}
