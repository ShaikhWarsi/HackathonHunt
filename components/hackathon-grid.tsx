"use client"

import { HackathonCard } from "./hackathon-card"
import type { Hackathon } from "@/lib/types"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HackathonGridProps {
  hackathons: Hackathon[]
  isLoading: boolean
  error?: Error | null
}

export function HackathonGrid({
  hackathons,
  isLoading,
  error,
}: HackathonGridProps) {
  // console.log('HackathonGrid received hackathons:', hackathons);
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading hackathons...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <svg className="size-12 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Failed to load hackathons</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              There was an error loading the hackathons. Please try again.
            </p>
          </div>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
  }

  if (hackathons.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-flex rounded-full bg-muted p-6">
            <svg className="size-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold">No hackathons found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your filters or search query</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {hackathons.map((hackathon, index) => (
        <HackathonCard key={hackathon._id} hackathon={hackathon} index={index} />
      ))}
    </div>
  )
}
