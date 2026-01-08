import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1 className="text-9xl font-extrabold text-brand-primary">404</h1>
            <h2 className="text-4xl font-semibold text-gray-800 mt-4 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md text-center">
                Oops! The page you are looking for does not exist. It might have been moved or removed.
            </p>
            <Link href="/">
                <Button className="bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold py-2 px-6 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                    Go Back Home
                </Button>
            </Link>
        </div>
    )
}
