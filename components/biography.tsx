"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/language-provider"

export function Biography() {
  const { t } = useLanguage()

  return (
    <section id="bio" className="py-12 bg-[#231405] rounded-lg mx-4 my-8">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-[#4d9e4d]">{t("biography")}</h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <div className="relative h-[400px] w-[400px] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f00] to-transparent z-10"></div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_7f8711cf-43c0-4c7f-b90d-7563caa72e8a-removebg-preview-mjFgRgCvMtkEHRO8kRrDEi6zsL4TcM.png"
                alt="ElGoodGoblin VTuber"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
          </div>

          <div>
            <Card className="bg-[#2a1a09] border-[#3d2a12]">
              <CardContent className="p-6">
                <Tabs defaultValue="history">
                  <TabsList className="grid w-full grid-cols-3 bg-[#1a0f00]">
                    <TabsTrigger
                      value="history"
                      className="data-[state=active]:bg-[#4d9e4d] data-[state=active]:text-white"
                    >
                      {t("history")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="personality"
                      className="data-[state=active]:bg-[#4d9e4d] data-[state=active]:text-white"
                    >
                      {t("personality")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="funfacts"
                      className="data-[state=active]:bg-[#4d9e4d] data-[state=active]:text-white"
                    >
                      {t("fun_facts")}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="history" className="mt-4 space-y-4">
                    <p>{t("bio_history_1")}</p>
                    <p>{t("bio_history_2")}</p>
                    <p>{t("bio_history_3")}</p>
                  </TabsContent>

                  <TabsContent value="personality" className="mt-4 space-y-4">
                    <p>{t("bio_personality_1")}</p>
                    <p>{t("bio_personality_2")}</p>
                    <p>{t("bio_personality_3")}</p>
                  </TabsContent>

                  <TabsContent value="funfacts" className="mt-4 space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>{t("bio_facts_1")}</li>
                      <li>{t("bio_facts_2")}</li>
                      <li>{t("bio_facts_3")}</li>
                      <li>{t("bio_facts_4")}</li>
                      <li>{t("bio_facts_5")}</li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
