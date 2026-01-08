import { prisma } from "@/lib/db"
import { History, User as UserIcon, Clock, HardDrive, Search } from "lucide-react"
import { format } from "date-fns"

export default async function AuditLogPage() {
    const logs = await prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            user: {
                select: { name: true, email: true }
            }
        },
        take: 100, // Show last 100 logs
    })

    const getActionColor = (action: string) => {
        switch (action) {
            case "create": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            case "update": return "bg-brand-success/10 text-brand-accent border-amber-500/20"
            case "delete": return "bg-red-500/10 text-red-400 border-red-500/20"
            default: return "bg-slate-500/10 text-slate-500 border-slate-500/20"
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Audit Logs</h1>
                    <p className="text-slate-500 mt-1">
                        Track all administrative actions and content changes
                    </p>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
                <table className="w-full min-w-[800px]">
                    <thead className="bg-slate-100/50">
                        <tr>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Action</th>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">User</th>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Entity</th>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">IP Address</th>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                    No activity logs found.
                                </td>
                            </tr>
                        ) : (
                            logs.map((log: any) => (
                                <tr key={log.id} className="hover:bg-slate-100/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border uppercase tracking-tighter ${getActionColor(log.action)}`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                                                <UserIcon className="h-4 w-4 text-slate-500" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-slate-900 font-medium">{log.user.name}</span>
                                                <span className="text-[10px] text-slate-500">{log.user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-slate-700 font-medium capitalize">{log.entityType}</span>
                                            <span className="text-[10px] text-slate-500 truncate max-w-[150px]">{log.entityName || log.entityId}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[10px] text-slate-500 font-mono">
                                        {log.ipAddress || "Unknown"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-slate-500">
                                            <Clock className="h-3.5 w-3.5 text-slate-600" />
                                            <span className="text-xs">{format(new Date(log.createdAt), "MMM d, HH:mm:ss")}</span>
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
