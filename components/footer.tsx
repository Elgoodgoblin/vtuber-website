"use client"

import Link from "next/link"
import { Beer, Heart, Gamepad2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-[#3d2a12] py-6 mt-12">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-4 md:gap-2">
          <div className="flex items-center gap-2">
            <Beer className="h-5 w-5 text-[#4d9e4d]" />
            <span className="text-lg font-bold text-[#4d9e4d]">ElGoodGoblin</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 my-2">
            <Link
              href="/game"
              className="text-sm flex items-center text-[#e8d5b5]/70 hover:text-[#4d9e4d] transition-colors"
            >
              <Gamepad2 className="mr-1 h-4 w-4" /> Play Goblin Clicker
            </Link>
          </div>

          <p className="text-center text-sm text-[#e8d5b5]/70">
            © {new Date().getFullYear()} ElGoodGoblin VTuber. {t("rights_reserved")}
          </p>

          <div className="flex items-center gap-1 text-sm text-[#e8d5b5]/70">
            {t("made_with")} <Heart className="h-3 w-3 text-[#4d9e4d] mx-1" /> {t("for_community")}
          </div>

          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
            <Link href="#" className="text-xs text-[#e8d5b5]/70 hover:text-[#4d9e4d] transition-colors">
              {t("privacy_policy")}
            </Link>
            <Link href="#" className="text-xs text-[#e8d5b5]/70 hover:text-[#4d9e4d] transition-colors">
              {t("terms_of_service")}
            </Link>
            <Link href="#" className="text-xs text-[#e8d5b5]/70 hover:text-[#4d9e4d] transition-colors">
              {t("contact")}
            </Link>
            <Link href="#" className="text-xs text-[#e8d5b5]/70 hover:text-[#4d9e4d] transition-colors">
              {t("faq")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
