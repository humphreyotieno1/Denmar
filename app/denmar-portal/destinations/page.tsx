import Link from "next/link"
import { prisma } from "@/lib/db"
import { Plus, MapPin, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteDestinationButton } from "./delete-button"

export default async function DestinationsPage() {
    const destinations = await prisma.destination.findMany({
        orderBy: [
            { country: { name: "asc" } },
            { order: "asc" },
            { name: "asc" }
        ],
        include: {
            country: {
                select: { name: true }
            }
        },
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Destinations</h1>
                    <p className="text-slate-500 mt-1">
                        Manage specific destinations within countries
                    </p>
                </div>
                <Link href="/denmar-portal/destinations/new">
                    <Button className="bg-brand-success hover:bg-brand-secondary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Destination
                    </Button>
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
                {destinations.length === 0 ? (
                    <div className="p-12 text-center">
                        <MapPin className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">
                            No destinations yet
                        </h3>
                        <p className="text-slate-500 mb-4">
                            Get started by adding your first destination
                        </p>
                        <Link href="/denmar-portal/destinations/new">
                            <Button className="bg-brand-success hover:bg-brand-secondary">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Destination
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-slate-100/50">
                            <tr>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Destination
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Country
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Price From
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
                            {destinations.map((dest) => (
                                <tr key={dest.id} className="hover:bg-slate-100/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-700 rounded-lg overflow-hidden">
                                                {dest.heroImage && (
                                                    <img
                                                        src={dest.heroImage}
                                                        alt={dest.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{dest.name}</p>
                                                <p className="text-sm text-slate-500">/{dest.slug}</p>
                                            </div>
                                            {dest.featured && (
                                                <Star className="h-4 w-4 text-brand-accent fill-amber-400" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                                            {dest.country.name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">
                                        ${dest.priceFrom.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {dest.isActive ? (
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
                                            <Link href={`/denmar-portal/destinations/${dest.id}`}>
                                                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <DeleteDestinationButton id={dest.id} name={dest.name} />
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

