"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Save, Loader2, Globe, Mail, Phone, MapPin, Share2, BarChart3, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/admin/image-upload"
import { toast } from "sonner"

const settingsSchema = z.object({
    siteName: z.string().min(1, "Site name is required"),
    siteDescription: z.string().min(1, "Site description is required"),
    contactEmail: z.string().email("Invalid email"),
    contactPhone: z.string().min(1, "Contact phone is required"),
    whatsappNumber: z.string().min(1, "WhatsApp number is required"),
    address: z.string().min(1, "Address is required"),
    socialFacebook: z.string().url().optional().or(z.literal("")),
    socialTwitter: z.string().url().optional().or(z.literal("")),
    socialInstagram: z.string().url().optional().or(z.literal("")),
    socialYoutube: z.string().url().optional().or(z.literal("")),
    socialTiktok: z.string().url().optional().or(z.literal("")),
    googleAnalyticsId: z.string().optional().or(z.literal("")),
    facebookPixelId: z.string().optional().or(z.literal("")),
    logoUrl: z.string().optional().or(z.literal("")),
    faviconUrl: z.string().optional().or(z.literal("")),
})

type SettingsFormData = z.infer<typeof settingsSchema>

interface SettingsFormProps {
    initialData: any
}

export function SettingsForm({ initialData }: SettingsFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [logoUrl, setLogoUrl] = useState(initialData?.logoUrl || "")
    const [faviconUrl, setFaviconUrl] = useState(initialData?.faviconUrl || "")

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isDirty },
    } = useForm<SettingsFormData>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            siteName: initialData?.siteName || "Denmar Tours & Travel",
            siteDescription: initialData?.siteDescription || "",
            contactEmail: initialData?.contactEmail || "",
            contactPhone: initialData?.contactPhone || "",
            whatsappNumber: initialData?.whatsappNumber || "",
            address: initialData?.address || "",
            socialFacebook: initialData?.socialFacebook || "",
            socialTwitter: initialData?.socialTwitter || "",
            socialInstagram: initialData?.socialInstagram || "",
            socialTiktok: initialData?.socialTiktok || "",
            socialYoutube: initialData?.socialYoutube || "",
            googleAnalyticsId: initialData?.googleAnalyticsId || "",
            facebookPixelId: initialData?.facebookPixelId || "",
        },
    })

    const onSubmit = async (data: SettingsFormData) => {
        setIsSubmitting(true)
        try {
            const response = await fetch("/api/denmar-portal/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, logoUrl, faviconUrl }),
            })

            if (!response.ok) {
                throw new Error("Failed to save settings")
            }

            toast.success("Settings updated successfully")
            router.refresh()
        } catch {
            toast.error("Failed to save settings")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
                    <p className="text-slate-500 mt-1">
                        Configure global website information and integrations
                    </p>
                </div>
                <Button
                    disabled={isSubmitting || (!isDirty && logoUrl === initialData?.logoUrl && faviconUrl === initialData?.faviconUrl)}
                    className="bg-brand-success hover:bg-brand-secondary"
                >
                    {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Settings */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <div className="flex items-center gap-2 text-slate-900 border-b border-slate-200 pb-4">
                            <Globe className="h-5 w-5 text-amber-500" />
                            <h2 className="text-lg font-semibold">General Information</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Site Name</Label>
                                <Input {...register("siteName")} className="bg-slate-100 border-slate-300 text-slate-900" />
                                {errors.siteName && <p className="text-xs text-red-400">{errors.siteName.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-700">Site Description (SEO Meta)</Label>
                                <Textarea {...register("siteDescription")} rows={4} className="bg-slate-100 border-slate-300 text-slate-900" />
                                {errors.siteDescription && <p className="text-xs text-red-400">{errors.siteDescription.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <div className="flex items-center gap-2 text-slate-900 border-b border-slate-200 pb-4">
                            <Mail className="h-5 w-5 text-amber-500" />
                            <h2 className="text-lg font-semibold">Contact Details</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Contact Email</Label>
                                <Input {...register("contactEmail")} className="bg-slate-100 border-slate-300 text-slate-900" />
                                {errors.contactEmail && <p className="text-xs text-red-400">{errors.contactEmail.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Contact Phone</Label>
                                <Input {...register("contactPhone")} className="bg-slate-100 border-slate-300 text-slate-900" />
                                {errors.contactPhone && <p className="text-xs text-red-400">{errors.contactPhone.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">WhatsApp Number (with country code)</Label>
                                <Input {...register("whatsappNumber")} className="bg-slate-100 border-slate-300 text-slate-900" placeholder="+254700000000" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Physical Address</Label>
                                <Input {...register("address")} className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <div className="flex items-center gap-2 text-slate-900 border-b border-slate-200 pb-4">
                            <Share2 className="h-5 w-5 text-amber-500" />
                            <h2 className="text-lg font-semibold">Social Media Links</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Facebook</Label>
                                <Input {...register("socialFacebook")} placeholder="https://facebook.com/..." className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Twitter / X</Label>
                                <Input {...register("socialTwitter")} placeholder="https://twitter.com/..." className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Instagram</Label>
                                <Input {...register("socialInstagram")} placeholder="https://instagram.com/..." className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Tiktok</Label>
                                <Input {...register("socialTiktok")} placeholder="https://tiktok.com/..." className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Youtube</Label>
                                <Input {...register("socialYoutube")} placeholder="https://youtube.com/..." className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <div className="flex items-center gap-2 text-slate-900 border-b border-slate-200 pb-4">
                            <ImageIcon className="h-5 w-5 text-amber-500" />
                            <h2 className="text-lg font-semibold">Branding</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Website Logo</Label>
                                <ImageUpload
                                    value={logoUrl}
                                    onChange={(url) => {
                                        setLogoUrl(url)
                                        setValue("logoUrl", url, { shouldDirty: true })
                                    }}
                                    folder="denmar/brand"
                                />
                            </div>
                            <div className="space-y-2 border-t border-slate-200 pt-6">
                                <Label className="text-slate-700">Favicon</Label>
                                <ImageUpload
                                    value={faviconUrl}
                                    onChange={(url) => {
                                        setFaviconUrl(url)
                                        setValue("faviconUrl", url, { shouldDirty: true })
                                    }}
                                    folder="denmar/brand"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <div className="flex items-center gap-2 text-slate-900 border-b border-slate-200 pb-4">
                            <BarChart3 className="h-5 w-5 text-amber-500" />
                            <h2 className="text-lg font-semibold">Integrations</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Google Analytics ID</Label>
                                <Input {...register("googleAnalyticsId")} placeholder="G-XXXXXXXXXX" className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Facebook Pixel ID</Label>
                                <Input {...register("facebookPixelId")} placeholder="1234567890" className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

