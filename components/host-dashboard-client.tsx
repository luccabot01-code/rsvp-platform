"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut, Calendar, ImageIcon } from "lucide-react"

interface Event {
  id: string
  slug: string
  title: string
  event_type: string
  date: string
  cover_image_url: string | null
  location: string
}

export function HostDashboardClient({ hostEmail }: { hostEmail: string }) {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from("events")
      .select("id, slug, title, event_type, date, cover_image_url, location")
      .eq("host_email", hostEmail)
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    setEvents(data || [])
    setIsLoading(false)
  }

  const handleLogout = async () => {
    await fetch("/api/host-logout", { method: "POST" })
    router.push("/")
    router.refresh()
  }

  const formatEventType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-[900px] mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Host Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{hostEmail}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium">Your Events</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading events...</p>
            ) : (
              <div className="space-y-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent/5 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center border">
                      {event.cover_image_url ? (
                        <img
                          src={event.cover_image_url || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{event.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatEventType(event.event_type)}
                        </span>
                        <span>•</span>
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/dashboard/${event.slug}`)}
                      className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                    >
                      Manage
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
