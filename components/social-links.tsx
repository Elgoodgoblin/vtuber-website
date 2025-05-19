"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Twitch, Youtube, Twitter, Instagram, DiscIcon as Discord } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export function SocialLinks() {
  const { t } = useLanguage()

  return (
    <section id="social" className="py-12 bg-[#231405] rounded-lg mx-4 my-8">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#4d9e4d]">{t("follow_me")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <SocialCard
            platform="Twitch"
            username="ElGoodGoblinVT"
            icon={<Twitch className="h-6 w-6" />}
            color="#9146FF"
            url="https://www.twitch.tv/elgoodgoblinvt"
          />
          <SocialCard
            platform="YouTube"
            username="ElGoodGoblinVT"
            icon={<Youtube className="h-6 w-6" />}
            color="#FF0000"
            url="https://www.youtube.com/@ElGoodGoblinVT"
          />
          <SocialCard
            platform="Twitter"
            username="@elgoodgoblin"
            icon={<Twitter className="h-6 w-6" />}
            color="#1DA1F2"
            url="https://x.com/elgoodgoblin"
          />
          <SocialCard
            platform="Instagram"
            username="elgoodgoblin"
            icon={<Instagram className="h-6 w-6" />}
            color="#E1306C"
            url="https://www.instagram.com/elgoodgoblin/"
          />
          <SocialCard
            platform="TikTok"
            username="elgoodgoblin.ttv"
            icon={<TiktokIcon className="h-6 w-6" />}
            color="#000000"
            url="https://www.tiktok.com/@elgoodgoblin.ttv"
          />
          <SocialCard
            platform="Discord"
            username="Join Server"
            icon={<Discord className="h-6 w-6" />}
            color="#5865F2"
            url="https://discord.gg/w7GCd5fMXj"
          />
        </div>
      </div>
    </section>
  )
}

interface SocialCardProps {
  platform: string
  username: string
  icon: React.ReactNode
  color: string
  url: string
}

function SocialCard({ platform, username, icon, color, url }: SocialCardProps) {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:shadow-[#4d9e4d]/20 bg-[#2a1a09] border-[#3d2a12]">
        <CardContent className="p-4 flex flex-col items-center text-center gap-2">
          <div className="rounded-full p-2" style={{ backgroundColor: color }}>
            {icon}
          </div>
          <div>
            <h3 className="font-medium">{platform}</h3>
            <p className="text-sm text-[#e8d5b5]/70">{username}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

// Custom TikTok icon since it's not in lucide-react
const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)
