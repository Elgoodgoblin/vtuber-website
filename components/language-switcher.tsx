"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className={`px-2 py-1 text-xs ${language === "en" ? "bg-[#4d9e4d]/20 text-[#4d9e4d]" : ""}`}
        onClick={() => setLanguage("en")}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`px-2 py-1 text-xs ${language === "es" ? "bg-[#4d9e4d]/20 text-[#4d9e4d]" : ""}`}
        onClick={() => setLanguage("es")}
      >
        ES
      </Button>
    </div>
  )
}
