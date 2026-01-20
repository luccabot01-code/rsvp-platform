"use client"

import type React from "react"

import { useState, useCallback, memo, useEffect } from "react"
import { RSVPForm } from "@/components/rsvp-form"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddToCalendarButton } from "@/components/add-to-calendar-button"
import { AnimatedBackground } from "@/components/animated-background"
import { Calendar, MapPin, Moon, Sun } from "lucide-react"
import { formatDate, EVENT_TYPE_LABELS } from "@/lib/utils/event-helpers"
import type { Event } from "@/lib/types"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { useTheme } from "next-themes"

interface RSVPPageClientProps {
  event: Event
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const DetailItem = memo(function DetailItem({
  icon: Icon,
  title,
  children,
  delay,
}: {
  icon: any
  title: string
  children: React.ReactNode
  delay: number
}) {
  return (
    <motion.div
      className="flex items-start gap-5"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <div className="p-3 rounded-xl bg-primary/10 border border-border flex-shrink-0">
        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <div className="flex-1 pt-0.5">
        <p className="font-semibold mb-2 text-base">{title}</p>
        {children}
      </div>
    </motion.div>
  )
})

export function RSVPPageClient({ event }: RSVPPageClientProps) {
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false)
  const [showFullDetails, setShowFullDetails] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleModalSuccess = useCallback(() => {
    setIsRsvpModalOpen(false)
  }, [])

  const handleOpenChange = useCallback((open: boolean) => {
    setIsRsvpModalOpen(open)
  }, [])

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      ;(document as any).startViewTransition(() => {
        setTheme(newTheme)
      })
    } else {
      setTheme(newTheme)
    }
  }

  const shouldTruncateDetails = event.program_notes && event.program_notes.length > 30
  const truncatedDetails = shouldTruncateDetails ? event.program_notes.slice(0, 30) : event.program_notes

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />

      {/* Fixed Header with Theme Toggle */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <motion.div
            className="flex items-center gap-3 min-w-0 flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="inline-block px-3 py-1 bg-secondary border border-border text-foreground rounded-full text-xs font-medium flex-shrink-0">
              {EVENT_TYPE_LABELS[event.event_type as keyof typeof EVENT_TYPE_LABELS]}
            </div>
            <h1 className="text-sm md:text-base font-semibold truncate">
              {event.title}
            </h1>
          </motion.div>

          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {mounted && (
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
            )}
          </motion.div>
        </div>
      </header>

      <main
        className={`container mx-auto px-4 py-8 md:py-12 pt-24 relative z-10 transition-all duration-500 ${
          isRsvpModalOpen ? "blur-sm" : "blur-0"
        }`}
        role="main"
      >
        <motion.article
          className="mx-auto max-w-3xl space-y-6 md:space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.header variants={itemVariants} className="text-center space-y-4 pt-4">
            <p className="text-lg md:text-xl text-muted-foreground">You're invited!</p>
          </motion.header>

          {event.cover_image_url && (
            <motion.figure variants={itemVariants}>
              <motion.div
                className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-border"
                whileHover={{ scale: 1.002 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={event.cover_image_url || "/placeholder.svg"}
                  alt={`${event.title} event cover image`}
                  className="w-full h-auto object-contain max-h-[500px] bg-muted"
                  loading="eager"
                  fetchPriority="high"
                />
              </motion.div>
            </motion.figure>
          )}

          <motion.section variants={itemVariants} aria-label="Event details">
            <Card className="bg-secondary/50 border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-8 px-8 md:px-12 lg:px-16 space-y-8">
                <DetailItem icon={Calendar} title="Date & Time" delay={0.2}>
                  <time dateTime={event.date} className="text-muted-foreground block mb-4 text-base">
                    {formatDate(event.date)}
                  </time>
                  <AddToCalendarButton
                    event={{
                      title: event.title,
                      description: event.program_notes,
                      location: event.location,
                      startDate: event.date,
                    }}
                  />
                </DetailItem>

                <DetailItem icon={MapPin} title="Location" delay={0.25}>
                  <address className="text-muted-foreground not-italic mb-4 text-base">{event.location}</address>
                  {event.location_url && (
                    <motion.a
                      href={event.location_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg"
                      aria-label={`View ${event.location} on map`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                    >
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      View on Map
                    </motion.a>
                  )}
                </DetailItem>

                {event.dress_code && (
                  <motion.div
                    className="flex items-start gap-5 pt-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <div className="p-3 rounded-xl bg-primary/10 border border-border flex-shrink-0">
                      <span className="text-xl" aria-hidden="true">
                        👔
                      </span>
                    </div>
                    <div className="pt-0.5">
                      <p className="font-semibold mb-1 text-base">Dress Code</p>
                      <p className="text-muted-foreground text-base">{event.dress_code}</p>
                    </div>
                  </motion.div>
                )}

                {event.program_notes && (
                  <motion.div
                    className="pt-6 border-t border-border"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.3 }}
                  >
                    <p className="font-semibold mb-3 text-base">Event Details</p>
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed break-words text-base">
                      {truncatedDetails}
                      {shouldTruncateDetails && "..."}
                    </p>
                    {shouldTruncateDetails && (
                      <Dialog open={showFullDetails} onOpenChange={setShowFullDetails}>
                        <DialogTrigger asChild>
                          <Button variant="link" className="p-0 h-auto text-primary hover:underline mt-3 font-medium">
                            Read more
                          </Button>
                        </DialogTrigger>
                        <DialogContent
                          showCloseButton={true}
                          className="max-w-[95vw] sm:max-w-2xl max-h-[80vh] overflow-y-auto p-6 bg-background border border-border shadow-2xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-foreground/30 [scrollbar-width:thin]"
                          overlayClassName="bg-black/60"
                        >
                          <DialogTitle className="sr-only">Program / Notes</DialogTitle>
                          <div className="w-full">
                            <h3 className="text-xl font-bold mb-4 break-words">Event Details</h3>
                            <p className="text-muted-foreground whitespace-pre-wrap break-all leading-relaxed text-base">
                              {event.program_notes}
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.section>

          <motion.section variants={itemVariants} aria-labelledby="rsvp-heading" className="text-center pb-8">
            <Dialog open={isRsvpModalOpen} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.15 }}>
                  <Button
                    size="lg"
                    className="w-full text-lg py-7 bg-primary text-primary-foreground hover:bg-primary/90 border border-border shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl font-semibold"
                  >
                    Click here to RSVP
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent
                showCloseButton={false}
                className="max-w-[95vw] md:max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border border-border shadow-2xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-foreground/30 [scrollbar-width:thin]"
                overlayClassName="bg-black/60"
              >
                <DialogTitle className="sr-only">RSVP Form</DialogTitle>
                
                <button
                  onClick={() => setIsRsvpModalOpen(false)}
                  className="absolute top-4 right-4 p-3 rounded-full bg-background hover:bg-muted transition-colors duration-200 z-50 cursor-pointer border border-border"
                  aria-label="Close"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Header */}
                <motion.div 
                  className="relative p-8 bg-primary text-primary-foreground border-b border-border rounded-t-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 mb-4 border border-primary-foreground/20"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
                  >
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </motion.div>
                  <motion.h2 
                    className="text-3xl font-bold mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    RSVP
                  </motion.h2>
                  <motion.p 
                    className="text-primary-foreground/80 text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    Please let us know if you can join us
                  </motion.p>
                </motion.div>

                <motion.div 
                  className="p-6 md:p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <RSVPForm event={event} onSuccess={handleModalSuccess} />
                </motion.div>
              </DialogContent>
            </Dialog>
          </motion.section>
        </motion.article>
      </main>
    </div>
  )
}
