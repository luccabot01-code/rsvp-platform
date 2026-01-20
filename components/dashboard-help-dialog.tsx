"use client"
import { HelpCircle, Sparkles, Link2, QrCode, Download, Edit3, RefreshCw, Users, BarChart3, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion"

interface DashboardHelpDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const helpSections = [
  {
    icon: BarChart3,
    title: "Real-Time Statistics",
    description: "Track your event metrics instantly",
    items: [
      "Total responses received",
      "Attending vs not attending count",
      "Total guest count with plus-ones",
      "Live updates without refresh"
    ]
  },
  {
    icon: Link2,
    title: "Share Your Event",
    description: "Multiple ways to invite guests",
    items: [
      "Copy invitation link instantly",
      "Open preview in new tab",
      "Share via social media",
      "Link never changes after edits"
    ]
  },
  {
    icon: QrCode,
    title: "QR Code Magic",
    description: "Professional sharing made easy",
    items: [
      "Download as JPG for printing",
      "Get SVG for Canva editing",
      "Perfect for physical invitations",
      "Instant mobile scanning"
    ]
  },
  {
    icon: Download,
    title: "Export Guest Data",
    description: "Your data, your way",
    items: [
      "Download as CSV file",
      "Open in Excel or Sheets",
      "Complete guest information",
      "Timestamps included"
    ]
  },
  {
    icon: Edit3,
    title: "Edit Anytime",
    description: "Keep your event up to date",
    items: [
      "Update event details easily",
      "Change date, time, location",
      "Upload new cover images",
      "All RSVPs are preserved"
    ]
  },
  {
    icon: Users,
    title: "Guest Management",
    description: "Full control over responses",
    items: [
      "View detailed guest info",
      "See personal messages",
      "Delete responses if needed",
      "Contact information visible"
    ]
  }
]

function HelpCard({ section, index }: { section: typeof helpSections[0]; index: number }) {
  const Icon = section.icon

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-secondary dark:bg-secondary border border-border p-6 hover:shadow-xl hover:border-muted-foreground/30 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-6 w-6" />
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-foreground">
          {section.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {section.description}
        </p>
        
        <ul className="space-y-2">
          {section.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-foreground/80"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ProTips() {
  return (
    <div
      className="mt-8 p-6 rounded-2xl bg-muted border border-border"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-2">Pro Tips</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Your dashboard updates automatically when guests RSVP - no refresh needed!</li>
            <li>• Use the SVG QR code in Canva to match your event's color theme</li>
            <li>• Export guest list regularly to keep a backup of your RSVPs</li>
            <li>• Your invitation link never changes, even after editing event details</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function SupportSection() {
  return (
    <div
      className="mt-6 text-center p-4 rounded-xl bg-muted border border-border"
    >
      <p className="text-sm text-muted-foreground mb-2">
        Need more help?
      </p>
      <a
        href="mailto:sahinturkzehra@gmail.com"
        className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline transition-colors"
      >
        Contact Support →
      </a>
    </div>
  )
}

export function DashboardHelpDialog({ open, onOpenChange }: DashboardHelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-transparent text-xs md:text-sm" 
          aria-label="Help Center"
        >
          <HelpCircle className="h-3.5 w-3.5 md:h-4 md:w-4 md:mr-2" />
          <span className="hidden sm:inline">Help</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[95vw] md:max-w-5xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border border-border shadow-2xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-foreground/40 [scrollbar-width:thin] dark:[scrollbar-color:rgba(255,255,255,0.2)_transparent] [scrollbar-color:rgba(0,0,0,0.2)_transparent]"
        overlayClassName="bg-black/60"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Dashboard Guide</DialogTitle>
        <div>
          {/* Header */}
          <motion.div 
            className="relative p-8 bg-primary text-primary-foreground overflow-hidden border-b border-border"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"></div>
            
            <button
              onClick={() => onOpenChange?.(false)}
              className="absolute top-4 right-4 p-3 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-all duration-200 hover:scale-110 z-50 cursor-pointer"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative z-10">
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 mb-4 border border-primary-foreground/20"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
              >
                <Sparkles className="h-8 w-8" />
              </motion.div>
              <motion.h2 
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                Dashboard Guide
              </motion.h2>
              <motion.p 
                className="text-primary-foreground/80 text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                Master your event management with these powerful features
              </motion.p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="p-6 md:p-8 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {helpSections.map((section, index) => (
                  <HelpCard key={section.title} section={section} index={index} />
                ))}
              </div>

              <ProTips />
              <SupportSection />
            </motion.div>
          </div>
      </DialogContent>
    </Dialog>
  )
}
