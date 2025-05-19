import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { SocialLinks } from "@/components/social-links"
import { StreamSchedule } from "@/components/stream-schedule"
import { VideoClips } from "@/components/video-clips"
import { Collaborators } from "@/components/collaborators"
import { Credits } from "@/components/credits"
import { Biography } from "@/components/biography"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a0f00] text-[#e8d5b5]">
      <div className="mx-auto max-w-7xl">
        <Navbar />
        <main>
          <Hero />
          <SocialLinks />
          <VideoClips />
          <StreamSchedule />
          <Collaborators />
          <Biography />
          <Credits />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  )
}
