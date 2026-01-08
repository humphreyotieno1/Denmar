"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Save, Loader2, Plus, X, Calendar } from "lucide-react"
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
import { format } from "date-fns"

const dealSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
    description: z.string().min(1, "Description is required"),
    shortDescription: z.string().min(1, "Short description is required").max(300, "Too long"),
    originalPrice: z.string().min(1, "Original price is required"),
    discountedPrice: z.string().min(1, "Discounted price is required"),
    discount: z.number().min(1).max(100),
    validUntil: z.string().min(1, "Expiry date is required"),
    destinations: z.array(z.string()).min(1, "At least one destination is required"),
    image: z.string().min(1, "Image is required"),
    category: z.string().min(1, "Category is required"),
    featured: z.boolean(),
    isActive: z.boolean(),
    order: z.number().min(0),
    terms: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
})

type DealFormData = z.infer<typeof dealSchema>

interface DealFormProps {
    initialData?: any
    mode: "create" | "edit"
}

export function DealForm({ initialData, mode }: DealFormProps) {
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
    } = useForm<DealFormData>({
        resolver: zodResolver(dealSchema),
        defaultValues: initialData ? {
            ...initialData,
            validUntil: format(new Date(initialData.validUntil), "yyyy-MM-dd"),
        } : {
            title: "",
            slug: "",
            description: "",
            shortDescription: "",
            originalPrice: "",
            discountedPrice: "",
            discount: 20,
            validUntil: format(new Date().setDate(new Date().getDate() + 30), "yyyy-MM-dd"),
            destinations: [""],
            image: "",
            category: "Package",
            featured: false,
            isActive: true,
            order: 0,
            terms: [""],
            highlights: [""],
        },
    })

    const { fields: destFields, append: appendDest, remove: removeDest } = useFieldArray({
        control,
        name: "destinations" as any
    })

    const { fields: termFields, append: appendTerm, remove: removeTerm } = useFieldArray({
        control,
        name: "terms" as any
    })

    const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({
        control,
        name: "highlights" as any
    })

    const featured = watch("featured")
    const isActive = watch("isActive")

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        setValue("title", title)
        if (mode === "create") {
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
            setValue("slug", slug)
        }
    }

    const onSubmit = async (data: DealFormData) => {
        setIsSubmitting(true)
        try {
            const url = mode === "create" ? "/api/denmar-portal/deals" : `/api/denmar-portal/deals/${initialData?.id}`
            const response = await fetch(url, {
                method: mode === "create" ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    image,
                    validUntil: new Date(data.validUntil).toISOString()
                }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Failed to save")
            }

            toast.success(mode === "create" ? "Deal created" : "Deal updated")
            router.push("/denmar-portal/deals")
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
                    <Link href="/denmar-portal/deals">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {mode === "create" ? "Add Deal" : "Edit Deal"}
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Configure special offers and discounts
                        </p>
                    </div>
                </div>
                <Button disabled={isSubmitting} className="bg-brand-success hover:bg-brand-secondary">
                    {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Deal
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Deal Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Deal Title</Label>
                                <Input {...register("title")} onChange={handleTitleChange} className="bg-slate-100 border-slate-300 text-slate-900" />
                                {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
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

                    {/* highlights */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-slate-900">Deal Highlights</h2>
                        {highlightFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2">
                                <Input {...register(`highlights.${index}` as any)} className="bg-slate-100 border-slate-300 text-slate-900" />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeHighlight(index)} className="text-slate-500">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="ghost" size="sm" onClick={() => appendHighlight("")} className="text-amber-500">
                            <Plus className="h-3 w-3 mr-2" /> Add highlight
                        </Button>
                    </div>

                    {/* terms */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-slate-900">Terms & Conditions</h2>
                        {termFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2">
                                <Input {...register(`terms.${index}` as any)} className="bg-slate-100 border-slate-300 text-slate-900" />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeTerm(index)} className="text-slate-500">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="ghost" size="sm" onClick={() => appendTerm("")} className="text-amber-500">
                            <Plus className="h-3 w-3 mr-2" /> Add term
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Main Image */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Deal Image</h2>
                        <ImageUpload
                            value={image}
                            onChange={(url) => {
                                setImage(url)
                                setValue("image", url, { shouldValidate: true })
                            }}
                            folder="denmar/deals"
                        />
                        {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
                    </div>

                    {/* Pricing */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Pricing & Validity</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-700">Original Price</Label>
                                    <Input {...register("originalPrice")} placeholder="e.g. $1,500" className="bg-slate-100 border-slate-300 text-slate-900" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700">Discounted Price</Label>
                                    <Input {...register("discountedPrice")} placeholder="e.g. $1,200" className="bg-slate-100 border-slate-300 text-slate-900" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-700">Discount %</Label>
                                    <Input type="number" {...register("discount", { valueAsNumber: true })} className="bg-slate-100 border-slate-300 text-slate-900" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700">Valid Until</Label>
                                    <Input type="date" {...register("validUntil")} className="bg-slate-100 border-slate-300 text-slate-900" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Destinations */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-slate-900">Related Destinations</h2>
                        {destFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2">
                                <Input {...register(`destinations.${index}` as any)} placeholder="e.g. Maasai Mara" className="bg-slate-100 border-slate-300 text-slate-900 text-xs" />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeDest(index)} className="text-slate-500">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="ghost" size="sm" onClick={() => appendDest("")} className="text-amber-500">
                            <Plus className="h-3 w-3 mr-2" /> Add destination
                        </Button>
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
                            <div className="space-y-2">
                                <Label className="text-slate-700">Category</Label>
                                <Select value={watch("category")} onValueChange={(val) => setValue("category", val)}>
                                    <SelectTrigger className="bg-slate-100 border-slate-300 text-slate-900">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-slate-200 text-slate-900">
                                        {["Flight", "Hotel", "Package", "Activity", "Safari"].map(c => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

