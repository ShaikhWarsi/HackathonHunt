"use client"

import { motion } from "framer-motion"

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="size-16 rounded-full border-4 border-border"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        {/* Spinning gradient */}
        <motion.div
          className="absolute inset-0 size-16 rounded-full border-4 border-transparent border-t-primary border-r-accent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        {/* Inner pulse */}
        <motion.div
          className="absolute inset-3 rounded-full bg-gradient-to-r from-primary to-accent"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>
    </div>
  )
}
