"use client"

import { EventForm } from "@/components/event-form"
import { HostLoginForm } from "@/components/host-login-form"
import { HelpCenterDialog } from "@/components/help-center-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { useState, useCallback, memo, useEffect } from "react"
import { motion } from "framer-motion"

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

const StepItem = memo(function StepItem({
  step,
  title,
  desc,
  index,
}: {
  step: number
  title: string
  desc: string
  index: number
}) {
  return (
    <motion.li
      className="flex gap-4"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + index * 0.05, duration: 0.3 }}
    >
      <motion.div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold shadow-soft"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-hidden="true"
      >
        {step}
      </motion.div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </motion.li>
  )
})

export function HomePageClient() {
  const [activeTab, setActiveTab] = useState("create")
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value)
  }, [])

  const handleCreateClick = useCallback(() => {
    setActiveTab("create")
  }, [])

  const handleLoginClick = useCallback(() => {
    setActiveTab("login")
  }, [])

  const handleSwitchToCreate = useCallback(() => {
    setActiveTab("create")
  }, [])

  useEffect(() => {
    const handleSwitchToLogin = () => {
      setActiveTab("login")
    }

    window.addEventListener("switchToHostLogin", handleSwitchToLogin)
    return () => window.removeEventListener("switchToHostLogin", handleSwitchToLogin)
  }, [])

  return (
    <div className="min-h-screen hero-gradient relative">
      <AnimatedBackground />

      {/* Fixed Header with Help and Theme Toggle */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Button
              onClick={() => setIsHelpOpen(true)}
              variant="outline"
              size="sm"
              className="bg-transparent"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </header>
      
      <HelpCenterDialog open={isHelpOpen} onOpenChange={setIsHelpOpen} />

      <main
        className={`container mx-auto px-4 py-12 pt-24 relative z-10 transition-all duration-300 ${
          isHelpOpen ? "blur-sm" : "blur-0"
        }`}
        role="main"
      >
        <motion.div
          className="mx-auto max-w-3xl space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.header variants={itemVariants} className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-balance text-gradient-title">Event RSVP Platform</h1>
            <p className="text-xl text-muted-foreground text-balance">
              Beautiful digital invitations with seamless RSVP management
            </p>
          </motion.header>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 w-full">
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              transition={{ duration: 0.15 }}
              className="relative group"
            >
              {/* Animated gradient glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-foreground via-muted-foreground to-foreground rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-500 animate-gradient-xy"></div>
              
              {/* Glassmorphism button */}
              <Button
                size="lg"
                className="relative w-full backdrop-blur-md bg-foreground/90 dark:bg-foreground/90 text-background dark:text-background border border-foreground/20 dark:border-foreground/20 hover:border-foreground/40 dark:hover:border-foreground/40 shadow-soft hover:shadow-soft-lg transition-all duration-200 overflow-hidden"
                onClick={handleCreateClick}
              >
                {/* Shine effect - activates on click */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-background/20 dark:via-background/20 to-transparent -translate-x-full group-active:translate-x-full transition-transform duration-300 ease-out"></span>
                <span className="relative">Create New Event</span>
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              transition={{ duration: 0.15 }}
              className="relative group"
            >
              {/* Animated gradient glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-foreground via-muted-foreground to-foreground rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-500 animate-gradient-xy"></div>
              
              {/* Glassmorphism button */}
              <Button
                size="lg"
                className="relative w-full backdrop-blur-md bg-foreground/90 dark:bg-foreground/90 text-background dark:text-background border border-foreground/20 dark:border-foreground/20 hover:border-foreground/40 dark:hover:border-foreground/40 shadow-soft hover:shadow-soft-lg transition-all duration-200 overflow-hidden"
                onClick={handleLoginClick}
              >
                {/* Shine effect - activates on click */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-background/20 dark:via-background/20 to-transparent -translate-x-full group-active:translate-x-full transition-transform duration-300 ease-out"></span>
                <span className="relative">Host Login</span>
              </Button>
            </motion.div>
          </motion.div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="hidden">
              <TabsTrigger value="create">Create New Event</TabsTrigger>
              <TabsTrigger value="login">Host Login</TabsTrigger>
            </TabsList>
            <TabsContent value="create" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <EventForm />
              </motion.div>
            </TabsContent>
            <TabsContent value="login" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <HostLoginForm onSwitchToCreate={handleSwitchToCreate} />
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
                  <Card className="backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-2xl md:backdrop-blur-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">Already have events?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Enter your email address to access your event dashboards and manage RSVPs. You'll be redirected
                        to your most recent event.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>

          <motion.section variants={itemVariants} aria-labelledby="how-it-works-heading">
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
              <Card className="backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden md:backdrop-blur-lg">
                <CardHeader>
                  <CardTitle id="how-it-works-heading" className="text-lg">
                    How it works
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4 list-none">
                    {[
                      {
                        step: 1,
                        title: "Create your event",
                        desc: "Fill in the details and create your unique event page",
                      },
                      {
                        step: 2,
                        title: "Share your link",
                        desc: "Send the RSVP link to your guests via email, text, or social media",
                      },
                      {
                        step: 3,
                        title: "Track responses",
                        desc: "Monitor RSVPs in real-time from your personal dashboard",
                      },
                    ].map((item, index) => (
                      <StepItem key={item.step} {...item} index={index} />
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>
        </motion.div>
      </main>
    </div>
  )
}
