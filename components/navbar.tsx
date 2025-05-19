"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Gamepad2 } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#3d2a12] bg-[#1a0f00]/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image src="/images/Moneda.png" alt="ElGoodGoblin Coin" width={28} height={28} className="object-contain" />
          </div>
          <span className="text-xl font-bold text-[#4d9e4d]">ElGoodGoblin</span>
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link href="#streams" className="text-sm font-medium hover:text-[#4d9e4d] transition-colors">
            {t("streams")}
          </Link>
          <Link href="#clips" className="text-sm font-medium hover:text-[#4d9e4d] transition-colors">
            {t("clips")}
          </Link>
          <Link href="#collaborators" className="text-sm font-medium hover:text-[#4d9e4d] transition-colors">
            {t("collaborators")}
          </Link>
          <Link href="#bio" className="text-sm font-medium hover:text-[#4d9e4d] transition-colors">
            {t("bio")}
          </Link>
          <Link href="#credits" className="text-sm font-medium hover:text-[#4d9e4d] transition-colors">
            {t("credits")}
          </Link>
          <Link href="/game" className="text-sm font-medium hover:text-[#4d9e4d] transition-colors flex items-center">
            <Gamepad2 className="mr-1 h-4 w-4" /> Game
          </Link>
          <Link href="https://www.twitch.tv/elgoodgoblinvt" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-[#4d9e4d] text-[#4d9e4d] hover:bg-[#4d9e4d] hover:text-white">
              {t("donate")}
            </Button>
          </Link>
          <LanguageSwitcher />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col space-y-4 py-4">
            <Link
              href="#streams"
              className="text-sm font-medium hover:text-[#4d9e4d]"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("streams")}
            </Link>
            <Link
              href="#clips"
              className="text-sm font-medium hover:text-[#4d9e4d]"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("clips")}
            </Link>
            <Link
              href="#collaborators"
              className="text-sm font-medium hover:text-[#4d9e4d]"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("collaborators")}
            </Link>
            <Link href="#bio" className="text-sm font-medium hover:text-[#4d9e4d]" onClick={() => setIsMenuOpen(false)}>
              {t("bio")}
            </Link>
            <Link
              href="#credits"
              className="text-sm font-medium hover:text-[#4d9e4d]"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("credits")}
            </Link>
            <Link
              href="/game"
              className="text-sm font-medium hover:text-[#4d9e4d] flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Gamepad2 className="mr-1 h-4 w-4" /> Game
            </Link>
            <Link href="https://www.twitch.tv/elgoodgoblinvt" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="w-full border-[#4d9e4d] text-[#4d9e4d] hover:bg-[#4d9e4d] hover:text-white"
              >
                {t("donate")}
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
