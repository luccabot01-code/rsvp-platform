"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Calendar, MapPin, Pencil, Moon, Sun, Plus } from "lucide-react"
import { EVENT_TYPE_LABELS } from "@/lib/utils/event-helpers"
import { formatDate } from "@/lib/utils/event-helpers"
import type { Event } from "@/lib/types"
import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogTitle } from "@/components/ui/dialog"
import { EventEditForm } from "@/components/event-edit-form"
import { DashboardHelpDialog } from "@/components/dashboard-help-dialog"
import { motion } from "framer-motion"

interface DashboardHeaderProps {
  event: Event
}

export function DashboardHeader({ event }: DashboardHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    window.location.reload()
  }

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    
    // Use View Transition API if available for smooth transition
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        setTheme(newTheme)
      })
    } else {
      setTheme(newTheme)
    }
  }

  return (
    <div className="flex items-start md:items-center justify-between gap-3 md:gap-4 pb-4 md:pb-6 border-b flex-wrap">
      <div className="flex items-start md:items-center gap-3 md:gap-4 lg:gap-6 flex-1 min-w-0 w-full md:w-auto flex-wrap">
        {/* Event Title & Type */}
        <div className="min-w-0 flex-shrink">
          <div className="flex items-center gap-2 md:gap-3 mb-1 flex-wrap">
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight truncate">{event.title}</h1>
            <Badge variant="secondary" className="flex-shrink-0 text-xs">
              {EVENT_TYPE_LABELS[event.event_type as keyof typeof EVENT_TYPE_LABELS]}
            </Badge>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">Event Dashboard</p>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground flex-shrink-0">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="truncate max-w-[200px]">{event.location}</span>
            {event.cover_image_url && (
              <Dialog open={isImagePreviewOpen} onOpenChange={setIsImagePreviewOpen}>
                <DialogTrigger asChild>
                  <button className="rounded-md overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow ml-2 cursor-pointer">
                    <img
                      src={event.cover_image_url || "/placeholder.svg"}
                      alt={event.title}
                      className="w-8 h-8 md:w-10 md:h-10 object-cover"
                    />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] md:max-w-5xl max-h-[90vh] overflow-y-auto p-6 md:p-8 bg-background border border-border shadow-2xl" showCloseButton={false}>
                  <DialogTitle className="sr-only">Event Cover Image</DialogTitle>
                  <button
                    onClick={() => setIsImagePreviewOpen(false)}
                    className="absolute top-4 right-4 p-3 rounded-full bg-background hover:bg-muted transition-colors duration-200 z-50 cursor-pointer border border-border"
                    aria-label="Close"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={event.cover_image_url || "/placeholder.svg"}
                      alt={event.title}
                      className="max-w-full max-h-[80vh] object-contain rounded-lg"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {event.cover_image_url && (
          <Dialog open={isImagePreviewOpen} onOpenChange={setIsImagePreviewOpen}>
            <DialogTrigger asChild>
              <button className="lg:hidden rounded-md overflow-hidden border border-border/50 cursor-pointer">
                <img
                  src={event.cover_image_url || "/placeholder.svg"}
                  alt={event.title}
                  className="w-8 h-8 object-cover"
                />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] md:max-w-5xl max-h-[90vh] overflow-y-auto p-6 md:p-8 bg-background border border-border shadow-2xl" showCloseButton={false}>
              <DialogTitle className="sr-only">Event Cover Image</DialogTitle>
              <button
                onClick={() => setIsImagePreviewOpen(false)}
                className="absolute top-4 right-4 p-3 rounded-full bg-background hover:bg-muted transition-colors duration-200 z-50 cursor-pointer border border-border"
                aria-label="Close"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={event.cover_image_url || "/placeholder.svg"}
                  alt={event.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}

        <button
          onClick={handleThemeToggle}
          className="relative h-8 w-16 rounded-full bg-muted border-2 border-border transition-colors duration-300 hover:bg-muted/80 focus:outline-none focus-visible:outline-none"
          aria-label="Toggle theme"
        >
          <motion.div
            className="absolute top-0.5 h-6 w-6 rounded-full bg-background border border-border shadow-md flex items-center justify-center"
            animate={{
              x: theme === "dark" ? 30 : 2,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          >
            <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </button>

        <Button variant="outline" size="sm" className="bg-transparent text-xs md:text-sm" asChild>
          <Link href="/">
            <Plus className="h-3.5 w-3.5 md:h-4 md:w-4 md:mr-2" />
            <span className="hidden sm:inline">Create New Event</span>
          </Link>
        </Button>

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="bg-transparent text-xs md:text-sm">
              <Pencil className="h-3.5 w-3.5 md:h-4 md:w-4 md:mr-2" />
              <span className="hidden sm:inline">Edit Event</span>
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-w-[95vw] md:max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border border-border shadow-2xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-foreground/40 [scrollbar-width:thin] dark:[scrollbar-color:rgba(255,255,255,0.2)_transparent] [scrollbar-color:rgba(0,0,0,0.2)_transparent]"
            showCloseButton={false}
          >
            <DialogTitle className="sr-only">Edit Event</DialogTitle>
            <DialogClose asChild>
              <button
                className="absolute top-4 right-4 p-3 rounded-full bg-background hover:bg-muted transition-all duration-200 hover:scale-110 z-50 cursor-pointer border border-border"
                aria-label="Close"
              >
                <span className="sr-only">Cancel</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </DialogClose>
            
            {/* Header */}
            <motion.div 
              className="relative p-8 bg-primary text-primary-foreground overflow-hidden border-b border-border"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"></div>
              
              <div className="relative z-10">
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 mb-4 border border-primary-foreground/20"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
                >
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </motion.div>
                <motion.h2 
                  className="text-3xl font-bold mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  Edit Event
                </motion.h2>
                <motion.p 
                  className="text-primary-foreground/80 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  Update your event details and settings
                </motion.p>
              </div>
            </motion.div>

            <motion.div 
              className="p-6 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <EventEditForm event={event} onSuccess={() => setIsEditModalOpen(false)} />
            </motion.div>
          </DialogContent>
        </Dialog>

        <DashboardHelpDialog open={isHelpOpen} onOpenChange={setIsHelpOpen} />

        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-transparent text-xs md:text-sm"
        >
          <RefreshCw className={`h-3.5 w-3.5 md:h-4 md:w-4 md:mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </div>
    </div>
  )
}
