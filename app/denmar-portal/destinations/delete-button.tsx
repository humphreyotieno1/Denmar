"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

interface DeleteDestinationButtonProps {
    id: string
    name: string
}

export function DeleteDestinationButton({ id, name }: DeleteDestinationButtonProps) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)

        try {
            const response = await fetch(`/api/denmar-portal/destinations/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Failed to delete")
            }

            toast.success(`"${name}" deleted successfully`)
            router.refresh()
        } catch {
            toast.error("Failed to delete destination")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white border-slate-200">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-slate-900">Delete Destination</AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-500">
                        Are you sure you want to delete "{name}"? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-500 hover:bg-red-600"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

