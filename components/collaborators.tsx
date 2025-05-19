"use client"

import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Twitch, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Skeleton } from "@/components/ui/skeleton"

interface Collaborator {
  name: string
  profileImage: string
  role: string
  twitchUrl: string
  description: string
}

export function Collaborators() {
  const { t } = useLanguage()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCollaborators() {
      try {
        setLoading(true)
        const response = await fetch("/api/twitch/collaborators")

        if (!response.ok) {
          throw new Error("Failed to fetch collaborators")
        }

        const data = await response.json()
        setCollaborators(data.collaborators)
      } catch (err) {
        console.error("Error fetching collaborators:", err)
        setError("Failed to load collaborators. Using fallback data.")
        // Fallback data if API fails
        setCollaborators([
          {
            name: "Ghost",
            profileImage: "/placeholder.svg?height=100&width=100",
            role: "VTuber",
            twitchUrl: "https://www.twitch.tv/ghost_from_vt",
            description: "Regular collaborator on variety streams and events.",
          },
          {
            name: "Rose",
            profileImage: "/placeholder.svg?height=100&width=100",
            role: "VTuber",
            twitchUrl: "https://www.twitch.tv/rosepurrnima",
            description: "Frequent guest for special events and themed streams.",
          },
          {
            name: "Chase",
            profileImage: "/placeholder.svg?height=100&width=100",
            role: "VTuber",
            twitchUrl: "https://www.twitch.tv/chasethepsychox",
            description: "Collaborator for gaming sessions and community events.",
          },
          {
            name: "ChoomVT",
            profileImage: "/placeholder.svg?height=100&width=100",
            role: "VTuber/Artist",
            twitchUrl: "https://www.twitch.tv/choomvt",
            description: "Collaborator and creator of 3D model, rig, and emotes.",
          },
          {
            name: "Flow",
            profileImage: "/placeholder.svg?height=100&width=100",
            role: "VTuber/Artist",
            twitchUrl: "https://www.twitch.tv/hil_flow",
            description: "Collaborator and creator of 2D GIF model.",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCollaborators()
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2

      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="collaborators" className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#4d9e4d]">{t("frequent_collaborators")}</h2>
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-[#4d9e4d] text-[#4d9e4d] hover:bg-[#4d9e4d] hover:text-white"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-[#4d9e4d] text-[#4d9e4d] hover:bg-[#4d9e4d] hover:text-white"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-amber-900/20 border border-amber-700 text-amber-200 p-3 rounded-md mb-4">{error}</div>
        )}

        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loading
            ? Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="min-w-[280px] snap-start">
                    <CollaboratorSkeleton />
                  </div>
                ))
            : collaborators.map((collab) => (
                <div key={collab.name} className="min-w-[280px] snap-start">
                  <CollaboratorCard
                    name={collab.name}
                    avatar={collab.profileImage}
                    role={collab.role}
                    link={collab.twitchUrl}
                    description={collab.description}
                  />
                </div>
              ))}
        </div>

        <div className="flex justify-center mt-6 md:hidden">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-[#4d9e4d] text-[#4d9e4d] hover:bg-[#4d9e4d] hover:text-white"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-[#4d9e4d] text-[#4d9e4d] hover:bg-[#4d9e4d] hover:text-white"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

interface CollaboratorCardProps {
  name: string
  avatar: string
  role: string
  link: string
  description: string
}

function CollaboratorCard({ name, avatar, role, link, description }: CollaboratorCardProps) {
  const { t } = useLanguage()

  return (
    <Card className="overflow-hidden bg-[#2a1a09] border-[#3d2a12] hover:border-[#4d9e4d] transition-all duration-200 h-full">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center h-full">
          <Avatar className="h-24 w-24 mb-4 border-2 border-[#4d9e4d]">
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-sm text-[#4d9e4d] mb-2">{role}</p>
          <p className="text-sm text-[#e8d5b5]/70 mb-4">{description}</p>
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs text-[#e8d5b5]/60 hover:text-[#4d9e4d] transition-colors mt-auto"
          >
            <Twitch className="h-3 w-3 mr-1" /> {t("view_channel")}
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function CollaboratorSkeleton() {
  return (
    <Card className="overflow-hidden bg-[#2a1a09] border-[#3d2a12] h-full">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center h-full">
          <Skeleton className="h-24 w-24 rounded-full mb-4" />
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-24 mt-auto" />
        </div>
      </CardContent>
    </Card>
  )
}
