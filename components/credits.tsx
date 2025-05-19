"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export function Credits() {
  const { t } = useLanguage()

  const artists = [
    {
      name: "ChoomVT",
      role: t("en") === "en" ? "Banner, 3D Model, Rig & Emotes" : "Banner, Modelo 3D, Rig y Emotes",
      link: "https://www.twitch.tv/choomvt",
      works: [
        t("en") === "en" ? "Banner design" : "Diseño del banner",
        t("en") === "en" ? "3D Model creation" : "Creación del modelo 3D",
        t("en") === "en" ? "Rigging" : "Rigging",
        t("en") === "en" ? "Emotes" : "Emotes",
      ],
    },
    {
      name: "Flow",
      role: t("en") === "en" ? "2D GIF Model" : "Modelo 2D formato GIF",
      link: "https://www.twitch.tv/hil_flow",
      works: [
        t("en") === "en" ? "2D GIF model design" : "Diseño del modelo 2D en formato GIF",
        t("en") === "en" ? "Animations" : "Animaciones",
      ],
    },
    {
      name: "Yahir",
      role: t("en") === "en" ? "Memes & PNG Tuber Model" : "Memes y Modelo PNG tuber",
      link: "https://www.twitch.tv/yahirccs",
      works: [
        t("en") === "en" ? "Meme creation" : "Creación de memes",
        t("en") === "en" ? "PNG Tuber puppet-style model" : "Modelo PNG tuber estilo marioneta",
      ],
    },
  ]

  return (
    <section id="credits" className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-[#4d9e4d]">{t("credits_and_thanks")}</h2>

        <Card className="bg-[#2a1a09] border-[#3d2a12]">
          <CardHeader>
            <CardTitle className="text-xl text-[#e8d5b5]">{t("creative_team")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {artists.map((artist) => (
                <div key={artist.name} className="p-4 rounded-lg bg-[#1a0f00] border border-[#3d2a12]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-lg flex items-center">
                        {artist.name}
                        <Link href={artist.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="ml-2 h-4 w-4 text-[#4d9e4d]" />
                        </Link>
                      </h3>
                      <p className="text-[#4d9e4d]">{artist.role}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-[#e8d5b5]/70 mb-1">{t("contributions")}:</p>
                    <ul className="list-disc pl-5 text-sm text-[#e8d5b5]/70">
                      {artist.works.map((work, index) => (
                        <li key={index}>{work}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-[#1a0f00] border border-[#3d2a12]">
              <h3 className="font-bold mb-2">{t("special_thanks")}</h3>
              <p className="text-sm text-[#e8d5b5]/70">{t("thanks_message")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
