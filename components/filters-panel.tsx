"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { FilterState } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"

interface FiltersPanelProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  isOpen: boolean
  onClose: () => void
  availableThemes: string[]
}

const THEME_OPTIONS = [
  "Beginner Friendly",
  "AI/ML",
  "Social Good",
  "Web Development",
  "Mobile",
  "Blockchain",
  "Hardware",
  "Gaming",
  "Healthcare",
  "Education",
]

export function FiltersPanel({ filters, onFiltersChange, isOpen, onClose, availableThemes }: FiltersPanelProps) {
  const toggleTheme = (theme: string) => {
    const newThemes = filters.themes.includes(theme)
      ? filters.themes.filter((t) => t !== theme)
      : [...filters.themes, theme]
    onFiltersChange({ ...filters, themes: newThemes })
  }

  const resetFilters = () => {
    onFiltersChange({
      search: filters.search, // Keep search

      themes: [],
      location: "",
      minPrize: undefined,
      maxPrize: undefined,
      startDate: undefined,
      endDate: undefined,
      sortBy: "endingSoon",
    })
  }

  const themesToShow = availableThemes.length > 0 ? availableThemes : THEME_OPTIONS

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed left-0 top-0 z-50 h-screen w-80 overflow-y-auto border-r border-border bg-card p-6 lg:sticky lg:top-20"
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
                <X className="size-5" />
              </Button>
            </div>

            <div className="space-y-6">


              {/* Themes Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Themes</Label>
                <div className="flex flex-wrap gap-2">
                  {themesToShow.map((theme) => (
                    <Badge
                      key={theme}
                      variant={filters.themes.includes(theme) ? "default" : "outline"}
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => toggleTheme(theme)}
                    >
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Prize Range Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Prize Range</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min Prize"
                    value={filters.minPrize || ""}
                    onChange={(e) =>
                      onFiltersChange({
                        ...filters,
                        minPrize: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="bg-background/50"
                  />
                  <Input
                    type="number"
                    placeholder="Max Prize"
                    value={filters.maxPrize || ""}
                    onChange={(e) =>
                      onFiltersChange({
                        ...filters,
                        maxPrize: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="bg-background/50"
                  />
                </div>
              </div>

              {/* Date Range Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Date Range</Label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={filters.startDate || ""}
                    onChange={(e) =>
                      onFiltersChange({ ...filters, startDate: e.target.value || undefined })
                    }
                    className="bg-background/50"
                  />
                  <Input
                    type="date"
                    value={filters.endDate || ""}
                    onChange={(e) =>
                      onFiltersChange({ ...filters, endDate: e.target.value || undefined })
                    }
                    className="bg-background/50"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Sort By</Label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value: "latest" | "prize" | "popular" | "endingSoon") =>
                    onFiltersChange({ ...filters, sortBy: value })
                  }
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="prize">Highest Prize</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="endingSoon">Ending Soon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Button */}
              <Button variant="outline" className="w-full bg-transparent" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
