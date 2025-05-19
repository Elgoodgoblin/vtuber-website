"use client"

import type React from "react"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, Calendar, Info } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

interface TwitchClip {
  id: string
  title: string
  thumbnail: string
  url: string
  duration: string
  createdAt: string
  views: string
  broadcasterName: string
}

interface TwitchVideo {
  id: string
  title: string
  thumbnail: string
  url: string
  duration: string
  createdAt: string
  views: string
  type: string
}

interface TwitchContent {
  clips: TwitchClip[]
  videos: TwitchVideo[]
  schedule: {
    segments: any[]
  }
  channelInfo: {
    id: string
    name: string
    profileImage: string
    description: string
  }
}

export function VideoClips() {
  const [activeTab, setActiveTab] = useState("clips")
  const { t } = useLanguage()
  const [content, setContent] = useState<TwitchContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTwitchContent() {
      try {
        setLoading(true)
        const response = await fetch("/api/twitch/content")

        if (!response.ok) {
          throw new Error("Failed to fetch Twitch content")
        }

        const data = await response.json()
        setContent(data)
      } catch (err) {
        console.error("Error fetching Twitch content:", err)
        setError("Failed to load content from Twitch. Using placeholder data.")
      } finally {
        setLoading(false)
      }
    }

    fetchTwitchContent()
  }, [])

  return (
    <section id="clips" className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-[#4d9e4d]">{t("videos_and_clips")}</h2>

        {error && (
          <div className="bg-amber-900/20 border border-amber-700 text-amber-200 p-3 rounded-md mb-4">{error}</div>
        )}

        <Tabs defaultValue="clips" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#2a1a09]">
            <TabsTrigger value="clips" className="data-[state=active]:bg-[#4d9e4d] data-[state=active]:text-white">
              {t("featured_clips")}
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-[#4d9e4d] data-[state=active]:text-white">
              {t("recent_streams")}
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-[#4d9e4d] data-[state=active]:text-white">
              {t("upcoming_streams")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clips" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loading
                ? // Loading skeletons for clips
                  Array(6)
                    .fill(0)
                    .map((_, index) => <VideoCardSkeleton key={index} />)
                : content && content.clips && content.clips.length > 0
                  ? // Real clips from Twitch
                    content.clips.map((clip) => (
                      <VideoCard
                        key={clip.id}
                        title={clip.title}
                        thumbnail={clip.thumbnail}
                        duration={clip.duration}
                        date={clip.createdAt}
                        views={clip.views}
                        url={clip.url}
                      />
                    ))
                  : // Fallback content if no clips are available
                    Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <VideoCard
                          key={index}
                          title={`Epic Moment #${index + 1}`}
                          thumbnail={`/placeholder.svg?height=200&width=350`}
                          duration="3:45"
                          date="3 days ago"
                          views="12.5K"
                        />
                      ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading
                ? // Loading skeletons for videos
                  Array(4)
                    .fill(0)
                    .map((_, index) => <VideoCardSkeleton key={index} isLarge />)
                : content && content.videos && content.videos.length > 0
                  ? // Real videos from Twitch
                    content.videos.map((video) => (
                      <VideoCard
                        key={video.id}
                        title={video.title}
                        thumbnail={video.thumbnail}
                        duration={video.duration}
                        date={video.createdAt}
                        views={video.views}
                        url={video.url}
                        isLarge
                      />
                    ))
                  : // Fallback content if no videos are available
                    Array(4)
                      .fill(0)
                      .map((_, index) => (
                        <VideoCard
                          key={index}
                          title={`Stream: Adventures in the Goblin Kingdom - Part ${index + 1}`}
                          thumbnail={`/placeholder.svg?height=200&width=350`}
                          duration="3:24:15"
                          date="1 week ago"
                          views="8.7K"
                          isLarge
                        />
                      ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            {loading ? (
              // Loading skeletons for upcoming streams
              <div className="grid grid-cols-1 gap-4">
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <UpcomingStreamSkeleton key={index} />
                  ))}
              </div>
            ) : content && content.schedule && content.schedule.segments && content.schedule.segments.length > 0 ? (
              // Real schedule from Twitch
              <div className="grid grid-cols-1 gap-4">
                {content.schedule.segments.map((segment: any, index: number) => (
                  <UpcomingStreamCard
                    key={index}
                    title={segment.title || "Upcoming Stream"}
                    date={new Date(segment.start_time).toLocaleString()}
                    description={segment.category?.name || "Join the stream for fun and entertainment!"}
                  />
                ))}
              </div>
            ) : (
              // No schedule available
              <div className="bg-[#2a1a09] border border-[#3d2a12] rounded-lg p-6 text-center">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="rounded-full bg-[#1a0f00] p-3">
                    <Info className="h-6 w-6 text-[#4d9e4d]" />
                  </div>
                  <h3 className="text-xl font-medium">No Scheduled Streams</h3>
                  <p className="text-[#e8d5b5]/70 max-w-md">
                    There are no scheduled streams at the moment. Follow ElGoodGoblin on Twitch to get notified when
                    streams go live!
                  </p>
                  <Link
                    href="https://www.twitch.tv/elgoodgoblinvt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2"
                  >
                    <Button className="bg-[#6a3e14] hover:bg-[#8b5425] text-white">
                      <Twitch className="mr-2 h-4 w-4" />
                      Follow on Twitch
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

interface VideoCardProps {
  title: string
  thumbnail: string
  duration: string
  date: string
  views: string
  url?: string
  isLarge?: boolean
}

function VideoCard({ title, thumbnail, duration, date, views, url, isLarge = false }: VideoCardProps) {
  const { t } = useLanguage()

  const cardContent = (
    <>
      <div className="relative">
        <img src={thumbnail || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs rounded">{duration}</div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 transition-opacity">
          <Play className="h-12 w-12 text-white" />
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className={`font-medium ${isLarge ? "text-lg" : "text-base"} line-clamp-2`}>{title}</h3>
        <div className="flex items-center gap-4 mt-2 text-sm text-[#e8d5b5]/70">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {date}
          </span>
          <span>
            {views} {t("views")}
          </span>
        </div>
      </CardContent>
    </>
  )

  return (
    <Card className="overflow-hidden bg-[#2a1a09] border-[#3d2a12] hover:border-[#4d9e4d] transition-all duration-200">
      {url ? (
        <Link href={url} target="_blank" rel="noopener noreferrer">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </Card>
  )
}

function VideoCardSkeleton({ isLarge = false }: { isLarge?: boolean }) {
  return (
    <Card className="overflow-hidden bg-[#2a1a09] border-[#3d2a12]">
      <div className="relative">
        <Skeleton className="w-full h-48" />
      </div>
      <CardContent className="p-4">
        <Skeleton className={`h-${isLarge ? "6" : "5"} w-full mb-2`} />
        <div className="flex items-center gap-4 mt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}

interface UpcomingStreamCardProps {
  title: string
  date: string
  description: string
}

function UpcomingStreamCard({ title, date, description }: UpcomingStreamCardProps) {
  return (
    <Card className="overflow-hidden bg-[#2a1a09] border-[#3d2a12]">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center justify-center bg-[#4d9e4d]/20 rounded-full p-4 h-16 w-16">
            <Calendar className="h-8 w-8 text-[#4d9e4d]" />
          </div>
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-[#4d9e4d] font-medium mt-1">{date}</p>
            <p className="text-[#e8d5b5]/70 mt-2">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function UpcomingStreamSkeleton() {
  return (
    <Card className="overflow-hidden bg-[#2a1a09] border-[#3d2a12]">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="w-full">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Import Twitch icon for the "No Scheduled Streams" state
function Twitch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" />
    </svg>
  )
}
