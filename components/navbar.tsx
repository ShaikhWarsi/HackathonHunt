"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onSearchChange: (value: string) => void
  onFiltersClick: () => void
  searchValue: string
}

export function Navbar({ onSearchChange, onFiltersClick, searchValue }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
              <span className="font-mono text-lg font-bold">H</span>
            </div>
            <span className="hidden text-xl font-bold sm:inline-block">
              Hack<span className="text-primary">Hunt</span>
            </span>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search hackathons..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-card/50 border-border/50 focus:border-primary transition-colors"
            />
          </div>

          {/* Filters Button */}
          <Button
            variant="outline"
            size="default"
            onClick={onFiltersClick}
            className="gap-2 border-border/50 bg-card/50 hover:bg-card"
          >
            <SlidersHorizontal className="size-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
