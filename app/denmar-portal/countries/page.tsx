import Link from "next/link"
import { prisma } from "@/lib/db"
import { Plus, Globe, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteCountryButton } from "./delete-button"

export default async function CountriesPage() {
    const countries = await prisma.country.findMany({
        orderBy: [{ order: "asc" }, { name: "asc" }],
        include: {
            _count: {
                select: { destinations: true },
            },
        },
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Countries</h1>
                    <p className="text-slate-500 mt-1">
                        Manage countries and their destinations
                    </p>
                </div>
                <Link href="/denmar-portal/countries/new">
                    <Button className="bg-brand-success hover:bg-brand-secondary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Country
                    </Button>
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
                {countries.length === 0 ? (
                    <div className="p-12 text-center">
                        <Globe className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">
                            No countries yet
                        </h3>
                        <p className="text-slate-500 mb-4">
                            Get started by adding your first country
                        </p>
                        <Link href="/denmar-portal/countries/new">
                            <Button className="bg-brand-success hover:bg-brand-secondary">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Country
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-slate-100/50">
                            <tr>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Country
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Region
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Destinations
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
                            {countries.map((country) => (
                                <tr key={country.id} className="hover:bg-slate-100/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-700 rounded-lg overflow-hidden">
                                                {country.heroImage && (
                                                    <img
                                                        src={country.heroImage}
                                                        alt={country.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{country.name}</p>
                                                <p className="text-sm text-slate-500">/{country.slug}</p>
                                            </div>
                                            {country.featured && (
                                                <Star className="h-4 w-4 text-brand-accent fill-amber-400" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">{country.region}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-50">
                                            {country._count.destinations} destinations
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {country.isActive ? (
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
                                            <Link href={`/denmar-portal/countries/${country.id}`}>
                                                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <DeleteCountryButton id={country.id} name={country.name} />
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

