import { prisma } from "@/lib/db"
import { DestinationForm } from "../destination-form"

export default async function NewDestinationPage() {
    const countries = await prisma.country.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true }
    })

    return <DestinationForm mode="create" countries={countries} />
}
