"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Download, Check, LinkIcon, QrCode, ExternalLink } from "lucide-react"
import { QRCodeGenerator } from "@/components/qr-code-generator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import type { Event, RSVP } from "@/lib/types"
import { motion } from "framer-motion"

interface DashboardActionsProps {
  event: Event
  rsvps: RSVP[]
}

export function DashboardActions({ event, rsvps }: DashboardActionsProps) {
  const [copied, setCopied] = useState(false)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const inviteUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/rsvp/${event.slug}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("[v0] Failed to copy:", err)
    }
  }

  const handleExportCSV = () => {
    const validRsvps = rsvps.filter(
      (rsvp) => rsvp.attendance_status === "attending" || rsvp.attendance_status === "not_attending",
    )

    const headers = ["Name", "Status", "Guests", "Contact", "Message", "Submitted At"]
    const rows = validRsvps.map((rsvp) => [
      rsvp.guest_name,
      rsvp.attendance_status === "attending" ? "Attending" : "Not Attending",
      rsvp.number_of_guests,
      [rsvp.guest_email, rsvp.guest_phone].filter(Boolean).join(" | ") || "N/A",
      rsvp.message || "",
      new Date(rsvp.created_at).toLocaleString(),
    ])

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    const link = document.createElement("a")
    link.setAttribute("href", encodeURI(csvContent))
    link.setAttribute("download", `${event.slug}-rsvps.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const validRsvpCount = rsvps.filter(
    (rsvp) => rsvp.attendance_status === "attending" || rsvp.attendance_status === "not_attending",
  ).length

  const buttonVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    hover: { x: 4 },
  }

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="glass-card shadow-soft hover:shadow-soft-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Actions</CardTitle>
            <CardDescription className="text-xs">Manage your event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Open Invitation Link Button */}
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: 0.05 }}
            >
              <Button
                onClick={() => window.open(inviteUrl, "_blank")}
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2 h-auto py-2.5 px-3 glass hover:bg-primary/5 transition-all duration-300 bg-transparent"
              >
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 text-left text-sm">Open Invitation Link</span>
              </Button>
            </motion.div>

            {/* Copy Link Button */}
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: 0.1 }}
            >
              <Button
                onClick={handleCopyLink}
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2 h-auto py-2.5 px-3 glass hover:bg-primary/5 transition-all duration-300 bg-transparent"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="flex-1 text-left text-sm">{copied ? "Link Copied!" : "Copy Invitation Link"}</span>
                {!copied && <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
              </Button>
            </motion.div>

            {/* QR Code Button */}
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: 0.15 }}
            >
              <Button
                onClick={() => setQrDialogOpen(true)}
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2 py-2.5 px-3 glass hover:bg-primary/5 transition-all duration-300"
              >
                <QrCode className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">View QR Code</span>
              </Button>
            </motion.div>

            {/* Export Button */}
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: 0.2 }}
            >
              <Button
                onClick={handleExportCSV}
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2 py-2.5 px-3 glass hover:bg-primary/5 transition-all duration-300 bg-transparent"
                disabled={validRsvpCount === 0}
              >
                <Download className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Export Guest List</span>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent
          className="sm:max-w-md p-0 gap-0 bg-background border border-border shadow-2xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-foreground/40 [scrollbar-width:thin] dark:[scrollbar-color:rgba(255,255,255,0.2)_transparent] [scrollbar-color:rgba(0,0,0,0.2)_transparent]"
          overlayClassName="bg-black/60"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">QR Code</DialogTitle>
          <DialogClose asChild>
            <button
              className="absolute top-4 right-4 p-3 rounded-full bg-background hover:bg-muted transition-all duration-200 hover:scale-110 z-50 cursor-pointer border border-border"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </DialogClose>
          
          {/* Header */}
          <motion.div 
            className="relative p-8 bg-primary text-primary-foreground overflow-hidden border-b border-border rounded-t-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5 rounded-t-lg"></div>
            
            <div className="relative z-10">
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 mb-4 border border-primary-foreground/20"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
              >
                <QrCode className="h-8 w-8" />
              </motion.div>
              <motion.h2 
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                QR Code
              </motion.h2>
              <motion.p 
                className="text-primary-foreground/80 text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                Share your event with a simple scan
              </motion.p>
            </div>
          </motion.div>

          <motion.div 
            className="p-6 md:p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
          >
            <div className="flex justify-center">
              <QRCodeGenerator url={inviteUrl} title={event.title} compact />
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  )
}
