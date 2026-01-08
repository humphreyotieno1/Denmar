import Link from "next/link"
import { prisma } from "@/lib/db"
import { Plus, Package, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeletePackageButton } from "./delete-button"

export default async function PackagesPage() {
    const packages = await prisma.package.findMany({
        orderBy: [
            { country: "asc" },
            { order: "asc" },
            { name: "asc" }
        ],
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Packages</h1>
                    <p className="text-slate-500 mt-1">
                        Manage holiday packages and itineraries
                    </p>
                </div>
                <Link href="/denmar-portal/packages/new">
                    <Button className="bg-brand-success hover:bg-brand-secondary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Package
                    </Button>
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
                {packages.length === 0 ? (
                    <div className="p-12 text-center">
                        <Package className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">
                            No packages yet
                        </h3>
                        <p className="text-slate-500 mb-4">
                            Get started by adding your first package
                        </p>
                        <Link href="/denmar-portal/packages/new">
                            <Button className="bg-brand-success hover:bg-brand-secondary">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Package
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-slate-100/50">
                            <tr>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Package
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Destination
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Duration
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Price
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
                            {packages.map((pkg) => (
                                <tr key={pkg.id} className="hover:bg-slate-100/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-700 rounded-lg overflow-hidden">
                                                {pkg.image && (
                                                    <img
                                                        src={pkg.image}
                                                        alt={pkg.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{pkg.name}</p>
                                                <p className="text-sm text-slate-500">/{pkg.slug}</p>
                                            </div>
                                            {pkg.featured && (
                                                <Star className="h-4 w-4 text-brand-accent fill-amber-400" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">
                                        <div className="flex flex-col">
                                            <span>{pkg.destinationSlug}</span>
                                            <span className="text-xs text-slate-500">{pkg.country}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">{pkg.duration}</td>
                                    <td className="px-6 py-4 text-slate-700">{pkg.price}</td>
                                    <td className="px-6 py-4">
                                        {pkg.isActive ? (
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
                                            <Link href={`/denmar-portal/packages/${pkg.id}`}>
                                                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <DeletePackageButton id={pkg.id} name={pkg.name} />
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

