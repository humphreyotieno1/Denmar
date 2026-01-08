"use client"

import { useState, useCallback } from "react"
import { Upload, X, Loader2, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { uploadToCloudinary } from "@/lib/cloudinary"
import Image from "next/image"

interface ImageUploadProps {
    value?: string
    onChange: (url: string) => void
    onRemove?: () => void
    folder?: string
    className?: string
    aspectRatio?: "square" | "video" | "wide" | "portrait"
}

export function ImageUpload({
    value,
    onChange,
    onRemove,
    folder = "denmar",
    className,
    aspectRatio = "video",
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [dragActive, setDragActive] = useState(false)

    const aspectRatioClass = {
        square: "aspect-square",
        video: "aspect-video",
        wide: "aspect-[21/9]",
        portrait: "aspect-[3/4]",
    }[aspectRatio]

    const handleUpload = useCallback(
        async (file: File) => {
            if (!file.type.startsWith("image/")) {
                setError("Please upload an image file")
                return
            }

            if (file.size > 10 * 1024 * 1024) {
                setError("Image must be less than 10MB")
                return
            }

            setIsUploading(true)
            setError(null)

            try {
                const result = await uploadToCloudinary(file, folder)
                onChange(result.secure_url)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Upload failed")
            } finally {
                setIsUploading(false)
            }
        },
        [folder, onChange]
    )

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            setDragActive(false)

            const file = e.dataTransfer.files[0]
            if (file) {
                handleUpload(file)
            }
        },
        [handleUpload]
    )

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0]
            if (file) {
                handleUpload(file)
            }
        },
        [handleUpload]
    )

    if (value) {
        return (
            <div className={cn("relative rounded-lg overflow-hidden", aspectRatioClass, className)}>
                <Image
                    src={value}
                    alt="Uploaded image"
                    fill
                    className="object-cover"
                />
                {onRemove && (
                    <button
                        type="button"
                        onClick={onRemove}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        )
    }

    return (
        <div className={cn("relative", className)}>
            <label
                className={cn(
                    "flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition-colors",
                    aspectRatioClass,
                    dragActive
                        ? "border-amber-400 bg-amber-400/10"
                        : "border-slate-700 hover:border-slate-600 bg-slate-800/50",
                    isUploading && "pointer-events-none opacity-60"
                )}
                onDragOver={(e) => {
                    e.preventDefault()
                    setDragActive(true)
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                    disabled={isUploading}
                />

                {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 text-amber-400 animate-spin" />
                        <span className="text-sm text-slate-400">Uploading...</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-center p-4">
                        <div className="p-3 bg-slate-700/50 rounded-xl">
                            <ImageIcon className="h-6 w-6 text-slate-400" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-300">
                                <span className="text-amber-400 font-medium">Click to upload</span>{" "}
                                or drag and drop
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                PNG, JPG, WebP up to 10MB
                            </p>
                        </div>
                    </div>
                )}
            </label>

            {error && (
                <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
        </div>
    )
}

// Multi-image upload component
interface MultiImageUploadProps {
    value: string[]
    onChange: (urls: string[]) => void
    folder?: string
    maxImages?: number
    className?: string
}

export function MultiImageUpload({
    value = [],
    onChange,
    folder = "denmar",
    maxImages = 10,
    className,
}: MultiImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleUpload = async (file: File) => {
        if (value.length >= maxImages) {
            setError(`Maximum ${maxImages} images allowed`)
            return
        }

        if (!file.type.startsWith("image/")) {
            setError("Please upload an image file")
            return
        }

        setIsUploading(true)
        setError(null)

        try {
            const result = await uploadToCloudinary(file, folder)
            onChange([...value, result.secure_url])
        } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed")
        } finally {
            setIsUploading(false)
        }
    }

    const handleRemove = (index: number) => {
        onChange(value.filter((_, i) => i !== index))
    }

    return (
        <div className={cn("space-y-4", className)}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {value.map((url, index) => (
                    <div key={url} className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                            src={url}
                            alt={`Image ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}

                {value.length < maxImages && (
                    <label
                        className={cn(
                            "flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed cursor-pointer transition-colors",
                            "border-slate-700 hover:border-slate-600 bg-slate-800/50",
                            isUploading && "pointer-events-none opacity-60"
                        )}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleUpload(file)
                            }}
                            className="hidden"
                            disabled={isUploading}
                        />

                        {isUploading ? (
                            <Loader2 className="h-6 w-6 text-amber-400 animate-spin" />
                        ) : (
                            <div className="flex flex-col items-center gap-1">
                                <Upload className="h-6 w-6 text-slate-400" />
                                <span className="text-xs text-slate-500">Add Image</span>
                            </div>
                        )}
                    </label>
                )}
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <p className="text-xs text-slate-500">
                {value.length} / {maxImages} images
            </p>
        </div>
    )
}
