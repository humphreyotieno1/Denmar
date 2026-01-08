// Cloudinary Upload Utility
// Requires CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env

export interface CloudinaryUploadResult {
    secure_url: string
    public_id: string
    width: number
    height: number
    format: string
    bytes: number
}

export async function uploadToCloudinary(
    file: File,
    folder: string = "denmar"
): Promise<CloudinaryUploadResult> {
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    if (!preset) {
        throw new Error("Cloudinary upload preset not configured")
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", preset)
    formData.append("folder", folder)

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

    if (!cloudName) {
        throw new Error("Cloudinary cloud name not configured")
    }

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    )

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to upload image")
    }

    return response.json()
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
    // This requires server-side implementation with API secret
    const response = await fetch("/api/denmar-portal/upload/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
    })

    if (!response.ok) {
        throw new Error("Failed to delete image")
    }
}

export function getCloudinaryUrl(
    publicId: string,
    options?: {
        width?: number
        height?: number
        crop?: string
        quality?: number
    }
): string {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

    if (!cloudName) {
        return publicId // Return as-is if not configured
    }

    const transforms: string[] = []

    if (options?.width) transforms.push(`w_${options.width}`)
    if (options?.height) transforms.push(`h_${options.height}`)
    if (options?.crop) transforms.push(`c_${options.crop}`)
    if (options?.quality) transforms.push(`q_${options.quality}`)

    const transformString = transforms.length > 0 ? transforms.join(",") + "/" : ""

    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}${publicId}`
}

