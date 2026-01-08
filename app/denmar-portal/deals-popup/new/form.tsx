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
import { ImageUpload } from "@/components/admin/image-upload"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

const popupSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().min(1, "Subtitle is required"),
    image: z.string().min(1, "Image is required"),
    discount: z.string().optional(),
    link: z.string().min(1, "Link is required"),
    isActive: z.boolean().default(true),
    priority: z.number().default(0),
})

type PopupFormData = z.infer<typeof popupSchema>

interface DealsPopupFormProps {
    initialData?: any
    mode: "create" | "edit"
}

export function DealsPopupForm({ initialData, mode }: DealsPopupFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [image, setImage] = useState(initialData?.image || "")

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<PopupFormData>({
        resolver: zodResolver(popupSchema),
        defaultValues: initialData || {
            title: "",
            subtitle: "",
            image: "",
            discount: "",
            link: "",
            isActive: true,
            priority: 0,
        },
    })

    const isActive = watch("isActive")

    const onSubmit = async (data: PopupFormData) => {
        setIsSubmitting(true)
        try {
            const url = mode === "create" ? "/api/denmar-portal/deals-popup" : `/api/denmar-portal/deals-popup/${initialData?.id}`
            const response = await fetch(url, {
                method: mode === "create" ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, image }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Failed to save")
            }

            toast.success(mode === "create" ? "Popup created" : "Popup updated")
            router.push("/denmar-portal/deals-popup")
            router.refresh()
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to save")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/denmar-portal/deals-popup">
                        <Button variant="ghost" size="icon" className="text-slate-500">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {mode === "create" ? "Add Popup" : "Edit Popup"}
                    </h1>
                </div>
                <Button disabled={isSubmitting} className="bg-brand-success hover:bg-brand-secondary">
                    {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Popup
                </Button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-slate-700">Title</Label>
                        <Input {...register("title")} className="bg-slate-50 border-slate-200 text-slate-900" />
                        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-700">Subtitle</Label>
                        <Input {...register("subtitle")} className="bg-slate-50 border-slate-200 text-slate-900" />
                        {errors.subtitle && <p className="text-xs text-red-500">{errors.subtitle.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-slate-700">Link URL</Label>
                        <Input {...register("link")} placeholder="/deals/something or https://..." className="bg-slate-50 border-slate-200 text-slate-900" />
                        {errors.link && <p className="text-xs text-red-500">{errors.link.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-700">Discount (Optional)</Label>
                        <Input {...register("discount")} placeholder="e.g. 40% OFF" className="bg-slate-50 border-slate-200 text-slate-900" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-slate-700">Popup Image</Label>
                    <ImageUpload
                        value={image}
                        onChange={(url) => {
                            setImage(url)
                            setValue("image", url, { shouldValidate: true })
                        }}
                        folder="denmar/popups"
                    />
                    {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex flex-col gap-1">
                        <Label className="text-slate-900">Active Status</Label>
                        <p className="text-xs text-slate-500">Toggle whether this popup is visible on the site.</p>
                    </div>
                    <Switch checked={isActive} onCheckedChange={(val) => setValue("isActive", val)} />
                </div>

                <div className="space-y-2">
                    <Label className="text-slate-700">Priority (Higher numbers show first)</Label>
                    <Input type="number" {...register("priority", { valueAsNumber: true })} className="bg-slate-50 border-slate-200 text-slate-900 w-32" />
                </div>
            </div>
        </form>
    )
}
