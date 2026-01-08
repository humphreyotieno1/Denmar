"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Save, Loader2, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ImageUpload, MultiImageUpload } from "@/components/admin/image-upload"
import { toast } from "sonner"

const destinationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
    countryId: z.string().min(1, "Country is required"),
    heroImage: z.string().min(1, "Hero image is required"),
    images: z.array(z.string()).min(1, "At least one image is required"),
    summary: z.string().min(1, "Summary is required").max(200, "Summary must be under 200 characters"),
    description: z.string().min(1, "Description is required"),
    priceFrom: z.number().min(0, "Price must be positive"),
    priceTo: z.number().min(0).optional().nullable(),
    bestTime: z.string().min(1, "Best time is required"),
    duration: z.string().min(1, "Duration is required"),
    featured: z.boolean(),
    isActive: z.boolean(),
    order: z.number().min(0),
    latitude: z.number().optional().nullable(),
    longitude: z.number().optional().nullable(),
    tags: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
})

type DestinationFormData = z.infer<typeof destinationSchema>

interface DestinationFormProps {
    initialData?: any
    countries: { id: string; name: string }[]
    mode: "create" | "edit"
}

export function DestinationForm({ initialData, countries, mode }: DestinationFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [heroImage, setHeroImage] = useState(initialData?.heroImage || "")
    const [images, setImages] = useState<string[]>(initialData?.images || [])
    const [tags, setTags] = useState<string[]>(initialData?.tags || [])
    const [newTag, setNewTag] = useState("")
    const [highlights, setHighlights] = useState<string[]>(initialData?.highlights || [])
    const [newHighlight, setNewHighlight] = useState("")

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<DestinationFormData>({
        resolver: zodResolver(destinationSchema),
        defaultValues: initialData ? {
            ...initialData,
            priceTo: initialData.priceTo || null,
            latitude: initialData.latitude || null,
            longitude: initialData.longitude || null,
        } : {
            name: "",
            slug: "",
            countryId: "",
            heroImage: "",
            images: [],
            summary: "",
            description: "",
            priceFrom: 0,
            priceTo: null,
            bestTime: "",
            duration: "",
            featured: false,
            isActive: true,
            order: 0,
            latitude: null,
            longitude: null,
            tags: [],
            highlights: [],
        },
    })

    const countryId = watch("countryId")
    const featured = watch("featured")
    const isActive = watch("isActive")

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        setValue("name", name)
        if (mode === "create") {
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
            setValue("slug", slug)
        }
    }

    const addTag = () => {
        if (newTag && !tags.includes(newTag)) {
            const updated = [...tags, newTag]
            setTags(updated)
            setValue("tags", updated)
            setNewTag("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        const updated = tags.filter(t => t !== tagToRemove)
        setTags(updated)
        setValue("tags", updated)
    }

    const addHighlight = () => {
        if (newHighlight && !highlights.includes(newHighlight)) {
            const updated = [...highlights, newHighlight]
            setHighlights(updated)
            setValue("highlights", updated)
            setNewHighlight("")
        }
    }

    const removeHighlight = (hToRemove: string) => {
        const updated = highlights.filter(h => h !== hToRemove)
        setHighlights(updated)
        setValue("highlights", updated)
    }

    const onSubmit = async (data: DestinationFormData) => {
        setIsSubmitting(true)

        try {
            const url = mode === "create"
                ? "/api/denmar-portal/destinations"
                : `/api/denmar-portal/destinations/${initialData?.id}`

            const response = await fetch(url, {
                method: mode === "create" ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    heroImage,
                    images,
                    tags,
                    highlights
                }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Failed to save")
            }

            toast.success(mode === "create" ? "Destination created successfully" : "Destination updated successfully")
            router.push("/denmar-portal/destinations")
            router.refresh()
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to save destination")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/denmar-portal/destinations">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {mode === "create" ? "Add Destination" : "Edit Destination"}
                        </h1>
                        <p className="text-slate-500 mt-1">
                            {mode === "create" ? "Create a new destination" : `Editing: ${initialData?.name}`}
                        </p>
                    </div>
                </div>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-brand-success hover:bg-brand-secondary"
                >
                    {isSubmitting ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Destination
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Basic Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-slate-700">Name</Label>
                                <Input
                                    id="name"
                                    {...register("name")}
                                    onChange={handleNameChange}
                                    className="bg-slate-100 border-slate-300 text-slate-900"
                                />
                                {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug" className="text-slate-700">URL Slug</Label>
                                <Input
                                    id="slug"
                                    {...register("slug")}
                                    className="bg-slate-100 border-slate-300 text-slate-900"
                                />
                                {errors.slug && <p className="text-sm text-red-400">{errors.slug.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="countryId" className="text-slate-700">Country</Label>
                            <Select
                                value={countryId}
                                onValueChange={(val) => setValue("countryId", val)}
                            >
                                <SelectTrigger className="bg-slate-100 border-slate-300 text-slate-900">
                                    <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-slate-200 text-slate-900">
                                    {countries.map((c) => (
                                        <SelectItem key={c.id} value={c.id}>
                                            {c.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.countryId && <p className="text-sm text-red-400">{errors.countryId.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="summary" className="text-slate-700">Summary (max 200 chars)</Label>
                            <Textarea
                                id="summary"
                                {...register("summary")}
                                rows={2}
                                className="bg-slate-100 border-slate-300 text-slate-900 resize-none"
                            />
                            {errors.summary && <p className="text-sm text-red-400">{errors.summary.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-slate-700">Full Description</Label>
                            <Textarea
                                id="description"
                                {...register("description")}
                                rows={6}
                                className="bg-slate-100 border-slate-300 text-slate-900 resize-none"
                            />
                            {errors.description && <p className="text-sm text-red-400">{errors.description.message}</p>}
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Gallery Images</h2>
                        <MultiImageUpload
                            value={images}
                            onChange={(urls) => {
                                setImages(urls)
                                setValue("images", urls, { shouldValidate: true })
                            }}
                            folder="denmar/destinations"
                        />
                        {errors.images && <p className="text-sm text-red-400">{errors.images.message}</p>}
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Highlights</h2>
                        <div className="flex gap-2">
                            <Input
                                value={newHighlight}
                                onChange={(e) => setNewHighlight(e.target.value)}
                                placeholder="Add a highlight..."
                                className="bg-slate-100 border-slate-300 text-slate-900"
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                            />
                            <Button type="button" onClick={addHighlight} variant="outline" className="border-slate-300 bg-slate-100 text-slate-900">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {highlights.map((h, i) => (
                                <div key={i} className="flex items-center justify-between p-2 bg-slate-100 rounded-lg border border-slate-300">
                                    <span className="text-sm text-slate-700">{h}</span>
                                    <button type="button" onClick={() => removeHighlight(h)} className="text-slate-500 hover:text-red-400">
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
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
                            folder="denmar/destinations"
                        />
                        {errors.heroImage && <p className="text-sm text-red-400">{errors.heroImage.message}</p>}
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Details</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="priceFrom" className="text-slate-700">Price From ($)</Label>
                                <Input
                                    id="priceFrom"
                                    type="number"
                                    {...register("priceFrom", { valueAsNumber: true })}
                                    className="bg-slate-100 border-slate-300 text-slate-900"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="priceTo" className="text-slate-700">Price To ($)</Label>
                                <Input
                                    id="priceTo"
                                    type="number"
                                    {...register("priceTo", { valueAsNumber: true })}
                                    className="bg-slate-100 border-slate-300 text-slate-900"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bestTime" className="text-slate-700">Best Time to Visit</Label>
                            <Input
                                id="bestTime"
                                {...register("bestTime")}
                                placeholder="e.g., June to October"
                                className="bg-slate-100 border-slate-300 text-slate-900"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duration" className="text-slate-700">Recommended Duration</Label>
                            <Input
                                id="duration"
                                {...register("duration")}
                                placeholder="e.g., 3-5 Days"
                                className="bg-slate-100 border-slate-300 text-slate-900"
                            />
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Tags</h2>
                        <div className="flex gap-2">
                            <Input
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder="Add tag..."
                                className="bg-slate-100 border-slate-300 text-slate-900"
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                            />
                            <Button type="button" onClick={addTag} variant="outline" className="border-slate-300 bg-slate-100 text-slate-900">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-brand-success/10 text-brand-accent border border-amber-500/20 rounded-md text-xs">
                                    {tag}
                                    <X className="h-3 w-3 cursor-pointer hover:text-amber-500" onClick={() => removeTag(tag)} />
                                </span>
                            ))}
                        </div>
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
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

