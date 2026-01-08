"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/admin/image-upload"
import { toast } from "sonner"

const countrySchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
    heroImage: z.string().min(1, "Hero image is required"),
    summary: z.string().min(1, "Summary is required").max(200, "Summary must be under 200 characters"),
    description: z.string().min(1, "Description is required"),
    region: z.string().min(1, "Region is required"),
    popularDestinations: z.number().min(0),
    featured: z.boolean(),
    isActive: z.boolean(),
    order: z.number().min(0),
})

type CountryFormData = z.infer<typeof countrySchema>

interface CountryFormProps {
    initialData?: CountryFormData & { id: string }
    mode: "create" | "edit"
}

export function CountryForm({ initialData, mode }: CountryFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [heroImage, setHeroImage] = useState(initialData?.heroImage || "")

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CountryFormData>({
        resolver: zodResolver(countrySchema),
        defaultValues: initialData || {
            name: "",
            slug: "",
            heroImage: "",
            summary: "",
            description: "",
            region: "",
            popularDestinations: 0,
            featured: false,
            isActive: true,
            order: 0,
        },
    })

    const featured = watch("featured")
    const isActive = watch("isActive")

    // Auto-generate slug from name
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        setValue("name", name)
        if (mode === "create") {
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
            setValue("slug", slug)
        }
    }

    const onSubmit = async (data: CountryFormData) => {
        setIsSubmitting(true)

        try {
            const url = mode === "create"
                ? "/api/denmar-portal/countries"
                : `/api/denmar-portal/countries/${initialData?.id}`

            const response = await fetch(url, {
                method: mode === "create" ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, heroImage }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Failed to save")
            }

            toast.success(mode === "create" ? "Country created successfully" : "Country updated successfully")
            router.push("/denmar-portal/countries")
            router.refresh()
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to save country")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/denmar-portal/countries">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {mode === "create" ? "Add Country" : "Edit Country"}
                        </h1>
                        <p className="text-slate-500 mt-1">
                            {mode === "create" ? "Create a new country" : `Editing: ${initialData?.name}`}
                        </p>
                    </div>
                </div>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-brand-success hover:bg-brand-secondary"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Country
                        </>
                    )}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Basic Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-slate-700">Country Name</Label>
                                <Input
                                    id="name"
                                    {...register("name")}
                                    onChange={handleNameChange}
                                    placeholder="e.g., Kenya"
                                    className="bg-slate-100 border-slate-300 text-slate-900"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-400">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug" className="text-slate-700">URL Slug</Label>
                                <Input
                                    id="slug"
                                    {...register("slug")}
                                    placeholder="e.g., kenya"
                                    className="bg-slate-100 border-slate-300 text-slate-900"
                                />
                                {errors.slug && (
                                    <p className="text-sm text-red-400">{errors.slug.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="region" className="text-slate-700">Region</Label>
                            <Input
                                id="region"
                                {...register("region")}
                                placeholder="e.g., East Africa"
                                className="bg-slate-100 border-slate-300 text-slate-900"
                            />
                            {errors.region && (
                                <p className="text-sm text-red-400">{errors.region.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="summary" className="text-slate-700">Summary (max 200 chars)</Label>
                            <Textarea
                                id="summary"
                                {...register("summary")}
                                placeholder="Brief summary for cards and previews..."
                                rows={2}
                                className="bg-slate-100 border-slate-300 text-slate-900 resize-none"
                            />
                            {errors.summary && (
                                <p className="text-sm text-red-400">{errors.summary.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-slate-700">Full Description</Label>
                            <Textarea
                                id="description"
                                {...register("description")}
                                placeholder="Detailed description of the country..."
                                rows={6}
                                className="bg-slate-100 border-slate-300 text-slate-900 resize-none"
                            />
                            {errors.description && (
                                <p className="text-sm text-red-400">{errors.description.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Hero Image</h2>
                        <ImageUpload
                            value={heroImage}
                            onChange={(url) => {
                                setHeroImage(url)
                                setValue("heroImage", url, { shouldValidate: true })
                            }}
                            onRemove={() => {
                                setHeroImage("")
                                setValue("heroImage", "", { shouldValidate: true })
                            }}
                            folder="denmar/countries"
                            aspectRatio="video"
                        />
                        {errors.heroImage && (
                            <p className="text-sm text-red-400">{errors.heroImage.message}</p>
                        )}
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Settings</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-slate-700">Featured</Label>
                                    <p className="text-xs text-slate-500">Show on homepage</p>
                                </div>
                                <Switch
                                    checked={featured}
                                    onCheckedChange={(val: boolean) => setValue("featured", val)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-slate-700">Active</Label>
                                    <p className="text-xs text-slate-500">Visible on website</p>
                                </div>
                                <Switch
                                    checked={isActive}
                                    onCheckedChange={(val: boolean) => setValue("isActive", val)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order" className="text-slate-700">Display Order</Label>
                            <Input
                                id="order"
                                type="number"
                                {...register("order", { valueAsNumber: true })}
                                className="bg-slate-100 border-slate-300 text-slate-900"
                            />
                            <p className="text-xs text-slate-500">Lower numbers appear first</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="popularDestinations" className="text-slate-700">Popular Destinations Count</Label>
                            <Input
                                id="popularDestinations"
                                type="number"
                                {...register("popularDestinations", { valueAsNumber: true })}
                                className="bg-slate-100 border-slate-300 text-slate-900"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

