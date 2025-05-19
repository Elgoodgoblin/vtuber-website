"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function StreamSchedule() {
  const { t, language } = useLanguage()

  const schedule = [
    {
      day: language === "en" ? t("monday") : t("monday"),
      time: "8:00 PM - 11:00 PM",
      game: "Minecraft",
      status: "regular",
    },
    {
      day: language === "en" ? t("wednesday") : t("wednesday"),
      time: "9:00 PM - 12:00 AM",
      game: "Genshin Impact",
      status: "regular",
    },
    {
      day: language === "en" ? t("friday") : t("friday"),
      time: "8:00 PM - 1:00 AM",
      game: language === "en" ? "Variety" : "Variado",
      status: "special",
    },
    {
      day: language === "en" ? t("saturday") : t("saturday"),
      time: "6:00 PM - 10:00 PM",
      game: "Just Chatting",
      status: "regular",
    },
    {
      day: language === "en" ? t("sunday") : t("sunday"),
      time: "4:00 PM - 7:00 PM",
      game: language === "en" ? "Collaborations" : "Colaboraciones",
      status: "collab",
    },
  ]

  return (
    <section id="streams" className="py-12 bg-[#231405] rounded-lg mx-4 my-8">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-[#4d9e4d]">{t("stream_schedule")}</h2>

        <Card className="bg-[#2a1a09] border-[#3d2a12]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-[#e8d5b5]">{t("weekly_schedule")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {schedule.map((item) => (
                <div
                  key={item.day}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-[#1a0f00] border border-[#3d2a12]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="font-bold text-lg min-w-[100px]">{item.day}</div>
                    <div className="flex items-center text-[#e8d5b5]/80">
                      <Clock className="mr-2 h-4 w-4" />
                      {item.time}
                    </div>
                  </div>
                  <div className="flex items-center mt-2 sm:mt-0">
                    <div className="text-sm text-[#e8d5b5]/80 mr-3">{item.game}</div>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-[#e8d5b5]/70">{t("schedule_note")}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function StatusBadge({ status }: { status: string }) {
  const { t } = useLanguage()

  switch (status) {
    case "special":
      return <Badge className="bg-[#8b5425] hover:bg-[#6a3e14]">{t("special")}</Badge>
    case "collab":
      return <Badge className="bg-[#4d9e4d] hover:bg-[#3d7e3d]">{t("collab")}</Badge>
    default:
      return <Badge className="bg-[#3d2a12] hover:bg-[#2a1a09]">{t("regular")}</Badge>
  }
}
