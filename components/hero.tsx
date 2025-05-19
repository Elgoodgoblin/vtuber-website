"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Twitch, Youtube } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export function Hero() {
  const { t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-[url('/images/wooden-background.jpg')] bg-cover bg-center opacity-20"></div>
      </div>
      <div className="container relative z-10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[#4d9e4d]">
              {t("welcome")}
              <br />
              ElGoodGoblin Bar
            </h1>
            <p className="max-w-[600px] text-lg text-[#e8d5b5]/80 md:text-xl">{t("tagline")}</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="https://www.twitch.tv/elgoodgoblinvt" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#6a3e14] hover:bg-[#8b5425] text-white w-full sm:w-auto">
                  <Twitch className="mr-2 h-5 w-5" />
                  {t("watch_stream")}
                </Button>
              </Link>
              <Link href="#clips">
                <Button
                  variant="outline"
                  className="border-[#4d9e4d] text-[#4d9e4d] hover:bg-[#4d9e4d] hover:text-white w-full sm:w-auto"
                >
                  <Youtube className="mr-2 h-5 w-5" />
                  {t("latest_clips")}
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div
              className="relative h-[400px] w-[400px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src={isHovered ? "/images/go_2.png" : "/images/go_1.png"}
                alt="ElGoodGoblin VTuber"
                width={400}
                height={400}
                className="object-contain transition-opacity duration-300"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
