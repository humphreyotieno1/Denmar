import Link from "next/link"
import { prisma } from "@/lib/db"
import { Plus, Tag, Pencil, Trash2, Eye, EyeOff, Star, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteDealButton } from "./delete-button"
import { format } from "date-fns"

export default async function DealsPage() {
    const deals = await prisma.deal.findMany({
        orderBy: [
            { validUntil: "asc" },
            { title: "asc" }
        ],
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Special Deals</h1>
                    <p className="text-slate-500 mt-1">
                        Manage discounts, offers, and limited-time deals
                    </p>
                </div>
                <Link href="/denmar-portal/deals/new">
                    <Button className="bg-brand-success hover:bg-brand-secondary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Deal
                    </Button>
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
                {deals.length === 0 ? (
                    <div className="p-12 text-center">
                        <Tag className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">
                            No deals found
                        </h3>
                        <p className="text-slate-500 mb-4">
                            Create a new deal to attract more customers
                        </p>
                        <Link href="/denmar-portal/deals/new">
                            <Button className="bg-brand-success hover:bg-brand-secondary">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Deal
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-slate-100/50">
                            <tr>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Deal
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Price
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Discount
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Valid Until
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Status
                                </th>
                                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {deals.map((deal) => (
                                <tr key={deal.id} className="hover:bg-slate-100/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-700 rounded-lg overflow-hidden">
                                                {deal.image && (
                                                    <img
                                                        src={deal.image}
                                                        alt={deal.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{deal.title}</p>
                                                <p className="text-sm text-slate-500">{deal.category}</p>
                                            </div>
                                            {deal.featured && (
                                                <Star className="h-4 w-4 text-brand-accent fill-amber-400" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500 line-through">${deal.originalPrice}</span>
                                            <span className="font-medium text-slate-900">${deal.discountedPrice}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-success/10 text-brand-accent border border-amber-500/20">
                                            {deal.discount}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-3.5 w-3.5 text-slate-500" />
                                            {format(new Date(deal.validUntil), "MMM d, yyyy")}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {deal.isActive ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                                                <Eye className="h-3 w-3" />
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-500">
                                                <EyeOff className="h-3 w-3" />
                                                Hidden
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/denmar-portal/deals/${deal.id}`}>
                                                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <DeleteDealButton id={deal.id} name={deal.title} />
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

