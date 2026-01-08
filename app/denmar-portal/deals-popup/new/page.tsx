import { prisma } from "@/lib/db"
import { DealsPopupForm } from "./form"

export default async function NewDealsPopupPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <DealsPopupForm mode="create" />
        </div>
    )
}
