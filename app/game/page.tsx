"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GoblinClicker } from "@/components/goblin-clicker"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function GamePage() {
  const { t } = useLanguage()
  const [clicks, setClicks] = useState(0)
  const [level, setLevel] = useState(0)

  // Load saved clicks from localStorage when component mounts
  useEffect(() => {
    const savedClicks = localStorage.getItem("goblinClicks")
    if (savedClicks) {
      setClicks(Number.parseInt(savedClicks))
    }
  }, [])

  // Save clicks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("goblinClicks", clicks.toString())

    // Determine level based on clicks
    if (clicks >= 1000) {
      setLevel(3) // Diamond
    } else if (clicks >= 500) {
      setLevel(2) // Gold
    } else if (clicks >= 100) {
      setLevel(1) // Silver
    } else {
      setLevel(0) // Bronze
    }
  }, [clicks])

  const handleClick = () => {
    setClicks((prev) => prev + 1)
  }

  const resetGame = () => {
    if (window.confirm("Are you sure you want to reset your progress?")) {
      setClicks(0)
      localStorage.setItem("goblinClicks", "0")
    }
  }

  return (
    <div className="min-h-screen bg-[#1a0f00] text-[#e8d5b5]">
      <div className="mx-auto max-w-7xl">
        <Navbar />
        <main className="container py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-[#4d9e4d]">Goblin Clicker Game</h1>
            <Link href="/">
              <Button variant="outline" className="border-[#4d9e4d] text-[#4d9e4d] hover:bg-[#4d9e4d] hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="bg-[#231405] rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">How to Play</h2>
                <p className="mb-4">
                  Click on the goblin as many times as you can to make it evolve! Watch for the special effects when you
                  click!
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="text-amber-600 font-medium">Bronze Goblin</span>: Starting level
                  </li>
                  <li>
                    <span className="text-gray-400 font-medium">Silver Goblin</span>: Unlocked at 100 clicks
                  </li>
                  <li>
                    <span className="text-yellow-400 font-medium">Gold Goblin</span>: Unlocked at 500 clicks
                  </li>
                  <li>
                    <span className="text-blue-400 font-medium">Diamond Goblin</span>: Unlocked at 1000 clicks
                  </li>
                </ul>
              </div>

              <div className="bg-[#231405] rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Your Progress</h2>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={resetGame}
                    className="bg-red-900 hover:bg-red-800 text-xs"
                  >
                    Reset Progress
                  </Button>
                </div>

                <div className="flex items-center justify-center mb-4">
                  <div className="text-4xl font-bold text-[#4d9e4d]">{clicks}</div>
                  <div className="text-lg ml-2 text-[#e8d5b5]/70">clicks</div>
                </div>

                <div className="w-full bg-[#1a0f00] rounded-full h-4 mb-2">
                  <div
                    className={`h-4 rounded-full ${
                      level === 0
                        ? "bg-amber-600"
                        : level === 1
                          ? "bg-gray-400"
                          : level === 2
                            ? "bg-yellow-400"
                            : "bg-blue-400"
                    }`}
                    style={{
                      width: `${Math.min(
                        100,
                        level === 0
                          ? (clicks / 100) * 100
                          : level === 1
                            ? ((clicks - 100) / 400) * 100
                            : level === 2
                              ? ((clicks - 500) / 500) * 100
                              : 100,
                      )}%`,
                    }}
                  ></div>
                </div>

                <div className="text-sm text-[#e8d5b5]/70 text-center">
                  {level === 0 && `${100 - clicks} more clicks to Silver!`}
                  {level === 1 && `${500 - clicks} more clicks to Gold!`}
                  {level === 2 && `${1000 - clicks} more clicks to Diamond!`}
                  {level === 3 && "Maximum level reached! Keep clicking for fun!"}
                </div>
              </div>
            </div>

            <GoblinClicker level={level} onClick={handleClick} clicks={clicks} />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
