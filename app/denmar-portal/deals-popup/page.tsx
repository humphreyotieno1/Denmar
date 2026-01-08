import Link from "next/link"
import { prisma } from "@/lib/db"
import { Plus, Megaphone, Pencil, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeletePopupButton } from "./delete-button"

export default async function DealsPopupPage() {
    const popups = await prisma.dealsPopup.findMany({
        orderBy: { priority: "desc" },
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Deals Popups</h1>
                    <p className="text-slate-500 mt-1">
                        Manage promotional popups for the website
                    </p>
                </div>
                <Link href="/denmar-portal/deals-popup/new">
                    <Button className="bg-brand-success hover:bg-brand-secondary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Popup
                    </Button>
                </Link>
            </div>

            {/* List */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
                {popups.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        <Megaphone className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No popups configured yet.</p>
                    </div>
                ) : (
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-slate-100/50">
                            <tr>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Title</th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Link</th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Discount</th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Status</th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Priority</th>
                                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {popups.map((popup) => (
                                <tr key={popup.id} className="hover:bg-slate-100/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                                {popup.image && <img src={popup.image} alt="" className="w-full h-full object-cover" />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{popup.title}</p>
                                                <p className="text-xs text-slate-500 line-clamp-1">{popup.subtitle}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-600 font-mono">{popup.link}</td>
                                    <td className="px-6 py-4 text-sm text-slate-700">{popup.discount || "N/A"}</td>
                                    <td className="px-6 py-4">
                                        {popup.isActive ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                <Eye className="h-3 w-3" /> Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-500 border border-slate-300">
                                                <EyeOff className="h-3 w-3" /> Inactive
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-700">{popup.priority}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/denmar-portal/deals-popup/${popup.id}`}>
                                                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <DeletePopupButton id={popup.id} title={popup.title} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
