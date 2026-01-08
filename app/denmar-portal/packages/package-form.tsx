"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Save, Loader2, Plus, X, GripVertical, ChevronDown, ChevronUp } from "lucide-react"
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
import { ImageUpload } from "@/components/admin/image-upload"
import { toast } from "sonner"

const itineraryDaySchema = z.object({
    day: z.number().min(1),
    title: z.string().min(1, "Day title is required"),
    description: z.string().min(1, "Day description is required"),
    meals: z.string().optional(),
    accommodation: z.string().optional(),
    activity: z.string().optional(),
})

const packageSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
    destinationSlug: z.string().min(1, "Destination is required"),
    country: z.string().min(1, "Country is required"),
    description: z.string().min(1, "Description is required"),
    shortDescription: z.string().min(1, "Short description is required").max(300, "Too long"),
    duration: z.string().min(1, "Duration is required"),
    price: z.string().min(1, "Price description is required"),
    includes: z.array(z.string()).min(1, "At least one inclusion is required"),
    excludes: z.array(z.string()).min(1, "At least one exclusion is required"),
    terms: z.array(z.string()).default([]),
    itinerary: z.array(itineraryDaySchema).min(1, "At least one itinerary day is required"),
    image: z.string().min(1, "Image is required"),
    category: z.string().min(1, "Category is required"),
    bestTime: z.string().optional(),
    featured: z.boolean(),
    isActive: z.boolean(),
    order: z.number().min(0),
})

type PackageFormData = z.infer<typeof packageSchema>

interface PackageFormProps {
    initialData?: any
    destinations: { slug: string; name: string; countryName: string }[]
    mode: "create" | "edit"
}

export function PackageForm({ initialData, destinations, mode }: PackageFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [image, setImage] = useState(initialData?.image || "")

    const defaultValues: PackageFormData = {
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        destinationSlug: initialData?.destinationSlug || "",
        country: initialData?.country || "",
        description: initialData?.description || "",
        shortDescription: initialData?.shortDescription || "",
        duration: initialData?.duration || "",
        price: initialData?.price || "",
        includes: initialData?.includes || [""],
        excludes: initialData?.excludes || [""],
        terms: initialData?.terms || [""],
        itinerary: initialData?.itinerary || [{ day: 1, title: "", description: "" }],
        image: initialData?.image || "",
        category: initialData?.category || "Safari",
        bestTime: initialData?.bestTime || "",
        featured: initialData?.featured || false,
        isActive: initialData?.isActive ?? true,
        order: initialData?.order || 0,
    }

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm<PackageFormData>({
        resolver: zodResolver(packageSchema) as any,
        defaultValues,
    })

    const { fields: includeFields, append: appendInclude, remove: removeInclude } = useFieldArray({
        control,
        name: "includes" as any
    })

    const { fields: excludeFields, append: appendExclude, remove: removeExclude } = useFieldArray({
        control,
        name: "excludes" as any
    })

    const { fields: termFields, append: appendTerm, remove: removeTerm } = useFieldArray({
        control,
        name: "terms" as any
    })

    const { fields: itineraryFields, append: appendItinerary, remove: removeItinerary, move: moveItinerary } = useFieldArray({
        control,
        name: "itinerary"
    })

    const destinationSlug = watch("destinationSlug")
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

    const handleDestinationChange = (slug: string) => {
        setValue("destinationSlug", slug)
        const dest = destinations.find(d => d.slug === slug)
        if (dest) {
            setValue("country", dest.countryName)
        }
    }

    const onSubmit = async (data: PackageFormData) => {
        setIsSubmitting(true)
        try {
            const url = mode === "create" ? "/api/denmar-portal/packages" : `/api/denmar-portal/packages/${initialData?.id}`
            const response = await fetch(url, {
                method: mode === "create" ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, image }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Failed to save")
            }

            toast.success(mode === "create" ? "Package created" : "Package updated")
            router.push("/denmar-portal/packages")
            router.refresh()
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to save")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/denmar-portal/packages">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {mode === "create" ? "Add Package" : "Edit Package"}
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Create and manage holiday itineraries
                        </p>
                    </div>
                </div>
                <Button disabled={isSubmitting} className="bg-brand-success hover:bg-brand-secondary">
                    {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Package
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">General Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Package Name</Label>
                                <Input {...register("name")} onChange={handleNameChange} className="bg-slate-100 border-slate-300 text-slate-900" />
                                {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">URL Slug</Label>
                                <Input {...register("slug")} className="bg-slate-100 border-slate-300 text-slate-900" />
                                {errors.slug && <p className="text-xs text-red-400">{errors.slug.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Destination</Label>
                                <Select value={destinationSlug} onValueChange={handleDestinationChange}>
                                    <SelectTrigger className="bg-slate-100 border-slate-300 text-slate-900">
                                        <SelectValue placeholder="Select destination" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-slate-200 text-slate-900">
                                        {destinations.map(d => (
                                            <SelectItem key={d.slug} value={d.slug}>{d.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.destinationSlug && <p className="text-xs text-red-400">{errors.destinationSlug.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Country</Label>
                                <Input {...register("country")} readOnly className="bg-slate-100 border-slate-300 text-slate-500" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700">Short Description</Label>
                            <Textarea {...register("shortDescription")} rows={2} className="bg-slate-100 border-slate-300 text-slate-900" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700">Full Description</Label>
                            <Textarea {...register("description")} rows={5} className="bg-slate-100 border-slate-300 text-slate-900" />
                        </div>
                    </div>

                    {/* Itinerary */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-900">Itinerary Builder</h2>
                            <Button type="button" variant="outline" size="sm" onClick={() => appendItinerary({ day: itineraryFields.length + 1, title: "", description: "" })} className="border-slate-300 text-slate-900">
                                <Plus className="h-4 w-4 mr-2" /> Add Day
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {itineraryFields.map((field, index) => (
                                <div key={field.id} className="p-4 bg-slate-100/50 border border-slate-300 rounded-lg space-y-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2 flex-1">
                                            <div className="w-8 h-8 rounded-full bg-brand-success flex items-center justify-center text-xs font-bold text-slate-950 shrink-0">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <Input
                                                    {...register(`itinerary.${index}.title` as const)}
                                                    placeholder="Day Title"
                                                    className="bg-transparent border-none text-slate-900 font-medium focus-visible:ring-0 p-0 h-auto text-lg placeholder:text-slate-400"
                                                />
                                                {errors.itinerary?.[index]?.title && (
                                                    <p className="text-xs text-red-500">{errors.itinerary[index]?.title?.message}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <Button type="button" variant="ghost" size="icon" onClick={() => index > 0 && moveItinerary(index, index - 1)} disabled={index === 0}>
                                                <ChevronUp className="h-4 w-4" />
                                            </Button>
                                            <Button type="button" variant="ghost" size="icon" onClick={() => index < itineraryFields.length - 1 && moveItinerary(index, index + 1)} disabled={index === itineraryFields.length - 1}>
                                                <ChevronDown className="h-4 w-4" />
                                            </Button>
                                            <Button type="button" variant="ghost" size="icon" onClick={() => removeItinerary(index)} className="text-red-400">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <Textarea {...register(`itinerary.${index}.description` as const)} placeholder="Describe the activities for this day..." className="bg-slate-100 border-slate-300 text-slate-900" />
                                        {errors.itinerary?.[index]?.description && (
                                            <p className="text-xs text-red-500">{errors.itinerary[index]?.description?.message}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Input {...register(`itinerary.${index}.meals` as const)} placeholder="Meals (e.g. B, L, D)" className="bg-slate-100 border-slate-300 text-slate-900 text-xs" />
                                        <Input {...register(`itinerary.${index}.accommodation` as const)} placeholder="Accommodation" className="bg-slate-100 border-slate-300 text-slate-900 text-xs" />
                                        <Input {...register(`itinerary.${index}.activity` as const)} placeholder="Main Activity" className="bg-slate-100 border-slate-300 text-slate-900 text-xs" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Main Image */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Main Image</h2>
                        <ImageUpload
                            value={image}
                            onChange={(url) => {
                                setImage(url)
                                setValue("image", url, { shouldValidate: true })
                            }}
                            folder="denmar/packages"
                        />
                        {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
                    </div>

                    {/* Logistics */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Pricing & Duration</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Price Display</Label>
                                <Input {...register("price")} placeholder="e.g. From $1,200 per person" className="bg-slate-100 border-slate-300 text-slate-900" />
                                {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Duration</Label>
                                <Input {...register("duration")} placeholder="e.g. 5 Days / 4 Nights" className="bg-slate-100 border-slate-300 text-slate-900" />
                                {errors.duration && <p className="text-xs text-red-500">{errors.duration.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Category</Label>
                                <Select value={watch("category")} onValueChange={(val) => setValue("category", val)}>
                                    <SelectTrigger className="bg-slate-100 border-slate-300 text-slate-900">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-slate-200 text-slate-900">
                                        {["Safari", "Beach", "Cultural", "Adventure", "Honeymoon"].map(c => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Includes/Excludes */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-slate-900">What's Included</h2>
                            {includeFields.map((field, index) => (
                                <div key={field.id} className="space-y-1">
                                    <div className="flex gap-2">
                                        <Input {...register(`includes.${index}` as const)} className="bg-slate-100 border-slate-300 text-slate-900 text-sm" />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeInclude(index)} className="text-slate-500">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {errors.includes?.[index] && (
                                        <p className="text-xs text-red-500">{errors.includes[index]?.message}</p>
                                    )}
                                </div>
                            ))}
                            <Button type="button" variant="ghost" size="sm" onClick={() => appendInclude("" as any)} className="text-brand-success">
                                <Plus className="h-3 w-3 mr-2" /> Add inclusion
                            </Button>
                            {errors.includes && <p className="text-xs text-red-500">{errors.includes.message}</p>}
                        </div>

                        <div className="space-y-4 pt-6 border-t border-slate-100">
                            <h2 className="text-lg font-semibold text-slate-900">What's Excluded</h2>
                            {excludeFields.map((field, index) => (
                                <div key={field.id} className="space-y-1">
                                    <div className="flex gap-2">
                                        <Input {...register(`excludes.${index}` as const)} className="bg-slate-100 border-slate-300 text-slate-900 text-sm" />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeExclude(index)} className="text-slate-500">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {errors.excludes?.[index] && (
                                        <p className="text-xs text-red-500">{errors.excludes[index]?.message}</p>
                                    )}
                                </div>
                            ))}
                            <Button type="button" variant="ghost" size="sm" onClick={() => appendExclude("" as any)} className="text-brand-success">
                                <Plus className="h-3 w-3 mr-2" /> Add exclusion
                            </Button>
                            {errors.excludes && <p className="text-xs text-red-500">{errors.excludes.message}</p>}
                        </div>

                        <div className="space-y-4 pt-6 border-t border-slate-100">
                            <h2 className="text-lg font-semibold text-slate-900">Terms & Conditions</h2>
                            {termFields.map((field, index) => (
                                <div key={field.id} className="space-y-1">
                                    <div className="flex gap-2">
                                        <Input {...register(`terms.${index}` as const)} className="bg-slate-100 border-slate-300 text-slate-900 text-sm" />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeTerm(index)} className="text-slate-500">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {errors.terms?.[index] && (
                                        <p className="text-xs text-red-500">{errors.terms[index]?.message}</p>
                                    )}
                                </div>
                            ))}
                            <Button type="button" variant="ghost" size="sm" onClick={() => appendTerm("" as any)} className="text-brand-success">
                                <Plus className="h-3 w-3 mr-2" /> Add term
                            </Button>
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Settings</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-slate-700">Featured</Label>
                                <Switch checked={featured} onCheckedChange={(val: boolean) => setValue("featured", val)} />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-slate-700">Active</Label>
                                <Switch checked={isActive} onCheckedChange={(val: boolean) => setValue("isActive", val)} />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Order</Label>
                                <Input type="number" {...register("order", { valueAsNumber: true })} className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form >
    )
}

