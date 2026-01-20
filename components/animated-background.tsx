"use client"

import { memo } from "react"

export const AnimatedBackground = memo(function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Static blobs - no animation for better performance */}
      <div
        className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-gradient-to-r from-gray-900 to-black rounded-full blur-3xl opacity-10 dark:opacity-20"
      />

      <div
        className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-gradient-to-l from-gray-800 to-gray-950 rounded-full blur-3xl opacity-10 dark:opacity-20"
      />

      <div
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-full blur-3xl opacity-5 dark:opacity-15"
      />

      <div
        className="absolute top-20 right-10 w-[300px] h-[300px] md:hidden bg-gradient-to-br from-gray-800 to-gray-950 rounded-full blur-3xl opacity-10 dark:opacity-15"
      />
    </div>
  )
})
