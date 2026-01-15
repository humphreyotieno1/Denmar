import { revalidatePath } from "next/cache"

/**
 * Revalidates all public-facing pages after CMS content changes.
 * Call this after any create, update, or delete operation.
 */
export function revalidatePublicPages() {
    // Main pages
    revalidatePath("/")
    revalidatePath("/packages")
    revalidatePath("/destinations")
    revalidatePath("/deals")
    revalidatePath("/services")
    revalidatePath("/about")
    revalidatePath("/contact")
}

/**
 * Revalidates a specific dynamic route.
 * @param path - The path to revalidate, e.g., "/packages/[slug]"
 */
export function revalidateSpecificPath(path: string) {
    revalidatePath(path)
}
