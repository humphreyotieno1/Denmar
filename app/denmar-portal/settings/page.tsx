import { prisma } from "@/lib/db"
import { SettingsForm } from "./settings-form"

export default async function SettingsPage() {
    const settings = await prisma.siteSettings.findUnique({
        where: { id: "settings" },
    })

    return <SettingsForm initialData={settings} />
}
