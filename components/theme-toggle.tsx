"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  const handleThemeToggle = () => {
    const newTheme = isDark ? "light" : "dark"
    
    // View Transition API support check
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      ;(document as any).startViewTransition(() => {
        setTheme(newTheme)
      })
    } else {
      setTheme(newTheme)
    }
  }

  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <button
        onClick={handleThemeToggle}
        className="relative h-10 w-20 rounded-full bg-muted border-2 border-border transition-colors duration-300 hover:bg-muted/80 focus:outline-none focus-visible:outline-none shadow-lg"
        aria-label="Toggle theme"
      >
        {/* Toggle circle */}
        <motion.div
          className="absolute top-0.5 h-8 w-8 rounded-full bg-background border border-border shadow-md flex items-center justify-center"
          animate={{
            x: isDark ? 38 : 2,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-foreground" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-foreground" />
        </motion.div>
        
        <span className="sr-only">Toggle theme</span>
      </button>
    </motion.div>
  )
}
