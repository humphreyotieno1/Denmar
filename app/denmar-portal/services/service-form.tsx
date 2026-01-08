"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm, useFieldArray } from "react-hook-form"
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
import { ImageUpload } from "@/components/admin/image-upload"
import { toast } from "sonner"

const serviceSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
    description: z.string().min(1, "Description is required"),
    shortDescription: z.string().min(1, "Short description is required").max(300, "Too long"),
    icon: z.string().min(1, "Icon name is required"),
    features: z.array(z.string()).default([]),
    price: z.string().optional().nullable(),
    duration: z.string().optional().nullable(),
    category: z.string().min(1, "Category is required"),
    featured: z.boolean(),
    isActive: z.boolean(),
    order: z.number().min(0),
    image: z.string().optional().nullable(),
})

type ServiceFormData = z.infer<typeof serviceSchema>

interface ServiceFormProps {
    initialData?: any
    mode: "create" | "edit"
}

export function ServiceForm({ initialData, mode }: ServiceFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [image, setImage] = useState(initialData?.image || "")

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm<ServiceFormData>({
        resolver: zodResolver(serviceSchema),
        defaultValues: initialData || {
            name: "",
            slug: "",
            description: "",
            shortDescription: "",
            icon: "Map",
            features: [""],
            price: "",
            duration: "",
            category: "Planning",
            featured: false,
            isActive: true,
            order: 0,
            image: "",
        },
    })

    const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
        control,
        name: "features" as any
    })

    const featured = watch("featured")
    const isActive = watch("isActive")
    const category = watch("category")

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        setValue("name", name)
        if (mode === "create") {
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
            setValue("slug", slug)
        }
    }

    const onSubmit = async (data: ServiceFormData) => {
        setIsSubmitting(true)
        try {
            const url = mode === "create" ? "/api/denmar-portal/services" : `/api/denmar-portal/services/${initialData?.id}`
            const response = await fetch(url, {
                method: mode === "create" ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, image }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Failed to save")
            }

            toast.success(mode === "create" ? "Service created" : "Service updated")
            router.push("/denmar-portal/services")
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
                    <Link href="/denmar-portal/services">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {mode === "create" ? "Add Service" : "Edit Service"}
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Configure travel service details
                        </p>
                    </div>
                </div>
                <Button disabled={isSubmitting} className="bg-brand-success hover:bg-brand-secondary">
                    {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Service
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Service Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Service Name</Label>
                                <Input {...register("name")} onChange={handleNameChange} className="bg-slate-100 border-slate-300 text-slate-900" />
                                {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">URL Slug</Label>
                                <Input {...register("slug")} className="bg-slate-100 border-slate-300 text-slate-900" />
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

                    {/* Features */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-slate-900">Key Features</h2>
                        {featureFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2">
                                <Input {...register(`features.${index}` as any)} className="bg-slate-100 border-slate-300 text-slate-900" />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(index)} className="text-slate-500">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="ghost" size="sm" onClick={() => appendFeature("")} className="text-amber-500">
                            <Plus className="h-3 w-3 mr-2" /> Add feature
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Main Image */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Service Image</h2>
                        <ImageUpload
                            value={image || ""}
                            onChange={(url) => {
                                setImage(url)
                                setValue("image", url, { shouldValidate: true })
                            }}
                            folder="denmar/services"
                        />
                        {errors.image && <p className="text-xs text-red-400">{errors.image.message}</p>}
                    </div>

                    {/* Details */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Details</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Icon Name (Lucide)</Label>
                                <Input {...register("icon")} placeholder="e.g. Map, Plane, Hotel" className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Category</Label>
                                <Select value={category} onValueChange={(val) => setValue("category", val)}>
                                    <SelectTrigger className="bg-slate-100 border-slate-300 text-slate-900">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-slate-200 text-slate-900">
                                        {["Planning", "Adventure", "Transportation", "Accommodation", "Cultural"].map(c => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Price Display</Label>
                                <Input {...register("price")} placeholder="e.g. $50 / person" className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Duration</Label>
                                <Input {...register("duration")} placeholder="e.g. 2-3 Hours" className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
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
        </form>
    )
}

