import { prisma } from "@/lib/db"
import { Users, Mail, Phone, Calendar, MessageSquare } from "lucide-react"
import { format } from "date-fns"

export default async function ContactsPage() {
    const submissions = await prisma.contactSubmission.findMany({
        orderBy: { submittedAt: "desc" },
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Contact Submissions</h1>
                    <p className="text-slate-500 mt-1">
                        Review inquiries and messages from website visitors
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {submissions.length === 0 ? (
                    <div className="p-12 bg-white border border-slate-200 rounded-xl text-center text-slate-500">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No contact submissions yet.</p>
                    </div>
                ) : (
                    submissions.map((sub: any) => (
                        <div key={sub.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                            <Users className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">{sub.name}</h3>
                                            <p className="text-brand-accent font-medium text-sm">{sub.subject}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-xs">
                                        <div className="flex items-center gap-2 text-slate-500 bg-slate-100/50 px-3 py-1.5 rounded-full">
                                            <Mail className="h-3.5 w-3.5 text-slate-600" />
                                            {sub.email}
                                        </div>
                                        {sub.phone && (
                                            <div className="flex items-center gap-2 text-slate-500 bg-slate-100/50 px-3 py-1.5 rounded-full">
                                                <Phone className="h-3.5 w-3.5 text-slate-600" />
                                                {sub.phone}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 text-slate-500 bg-slate-100/50 px-3 py-1.5 rounded-full">
                                            <Calendar className="h-3.5 w-3.5 text-slate-600" />
                                            {format(new Date(sub.submittedAt), "MMM d, yyyy HH:mm")}
                                        </div>
                                    </div>
                                </div>

                                <div className="pl-0 md:pl-16">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Message</h4>
                                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{sub.message}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
