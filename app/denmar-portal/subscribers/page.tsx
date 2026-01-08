import { prisma } from "@/lib/db"
import { Mail, CheckCircle, Clock } from "lucide-react"
import { format } from "date-fns"

export default async function SubscribersPage() {
    const subscribers = await prisma.newsletterSubscriber.findMany({
        orderBy: { subscribedAt: "desc" },
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Newsletter Subscribers</h1>
                    <p className="text-slate-500 mt-1">
                        Manage your audience and marketing list
                    </p>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
                <table className="w-full min-w-[600px]">
                    <thead className="bg-slate-100/50">
                        <tr>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Email Address</th>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Status</th>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Subscribed At</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {subscribers.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                                    No subscribers yet.
                                </td>
                            </tr>
                        ) : (
                            subscribers.map((sub: any) => (
                                <tr key={sub.id} className="hover:bg-slate-100/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                <Mail className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm text-slate-900 font-medium">{sub.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            <CheckCircle className="h-3 w-3" />
                                            Subscribed
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-slate-500">
                                            <Clock className="h-3.5 w-3.5 text-slate-600" />
                                            <span className="text-xs">{format(new Date(sub.subscribedAt), "MMM d, yyyy")}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
