import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-6 inline-flex size-20 items-center justify-center rounded-full bg-muted">
          <span className="text-4xl">404</span>
        </div>
        <h1 className="mb-2 text-2xl font-bold">Hackathon Not Found</h1>
        <p className="mb-6 text-muted-foreground">
          The hackathon you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}
