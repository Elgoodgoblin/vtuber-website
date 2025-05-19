"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"

interface GoblinClickerProps {
  level: number
  onClick: () => void
  clicks: number
}

export function GoblinClicker({ level, onClick, clicks }: GoblinClickerProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [prevLevel, setPrevLevel] = useState(level)
  const [clickEffects, setClickEffects] = useState<{ id: number; x: number; y: number }[]>([])

  // Check for level up
  useEffect(() => {
    if (level > prevLevel) {
      setShowLevelUp(true)

      // Crear efecto de celebración simple con divs
      createCelebrationEffect()

      // Hide level up message after 3 seconds
      const timer = setTimeout(() => {
        setShowLevelUp(false)
      }, 3000)

      return () => clearTimeout(timer)
    }

    setPrevLevel(level)
  }, [level, prevLevel])

  // Función para crear un efecto de celebración simple
  const createCelebrationEffect = () => {
    if (typeof document === "undefined") return

    const container = document.createElement("div")
    container.style.position = "fixed"
    container.style.top = "0"
    container.style.left = "0"
    container.style.width = "100%"
    container.style.height = "100%"
    container.style.pointerEvents = "none"
    container.style.zIndex = "9999"
    document.body.appendChild(container)

    // Crear 50 partículas
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div")

      // Estilo base de la partícula
      particle.style.position = "absolute"
      particle.style.width = "10px"
      particle.style.height = "10px"
      particle.style.borderRadius = "50%"
      particle.style.pointerEvents = "none"

      // Color aleatorio basado en el nivel
      const colors =
        level === 1
          ? ["#c0c0c0", "#d8d8d8", "#a8a8a8"] // Plata
          : level === 2
            ? ["#ffd700", "#ffdf00", "#ffcc00"] // Oro
            : level === 3
              ? ["#b9f2ff", "#a3e4ff", "#88d8ff"] // Diamante
              : ["#cd7f32", "#b87333", "#a56831"] // Bronce

      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]

      // Posición inicial (centro de la pantalla)
      particle.style.left = "50%"
      particle.style.top = "50%"

      // Velocidad y dirección aleatorias
      const angle = Math.random() * Math.PI * 2
      const speed = 5 + Math.random() * 10
      const vx = Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed - 10 // Bias upward

      // Añadir al contenedor
      container.appendChild(particle)

      // Animación
      let posX = window.innerWidth / 2
      let posY = window.innerHeight / 2
      let opacity = 1
      let scale = 1

      const animate = () => {
        if (opacity <= 0) {
          particle.remove()
          return
        }

        // Actualizar posición
        posX += vx
        posY += vy + 0.5 // Gravedad

        // Actualizar estilo
        particle.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`
        particle.style.opacity = opacity.toString()

        // Reducir opacidad y escala
        opacity -= 0.01
        scale -= 0.005

        requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    }

    // Eliminar el contenedor después de 3 segundos
    setTimeout(() => {
      container.remove()
    }, 3000)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Get click position relative to the target element
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Add click effect
    const newEffect = {
      id: Date.now(),
      x,
      y,
    }
    setClickEffects((prev) => [...prev, newEffect])

    // Remove effect after animation completes
    setTimeout(() => {
      setClickEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id))
    }, 500)

    setIsAnimating(true)
    onClick()

    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false)
    }, 400)
  }

  const goblinImages = [
    "/images/bronce.png", // Level 0
    "/images/plata.png", // Level 1
    "/images/oro.png", // Level 2
    "/images/diamante.png", // Level 3
  ]

  const levelNames = ["Bronze", "Silver", "Gold", "Diamond"]

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        {/* Level Up Message */}
        {showLevelUp && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-[#4d9e4d] text-white px-4 py-2 rounded-lg shadow-lg z-10 animate-fadeIn">
            <div className="text-center">
              <div className="text-lg font-bold">Level Up!</div>
              <div className="text-sm">{levelNames[level]} Goblin Unlocked!</div>
            </div>
          </div>
        )}

        {/* Goblin Image */}
        <div
          className={`cursor-pointer relative transition-transform duration-200 hover:scale-105 ${
            isAnimating ? "animate-click" : ""
          }`}
          onClick={handleClick}
        >
          <div className="relative h-[300px] w-[300px]">
            <Image
              src={goblinImages[level] || "/placeholder.svg"}
              alt={`${levelNames[level]} Goblin`}
              width={300}
              height={300}
              className="object-contain"
              priority
            />

            {/* Click effects */}
            {clickEffects.map((effect) => (
              <div
                key={effect.id}
                className="absolute pointer-events-none"
                style={{
                  left: effect.x,
                  top: effect.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Ripple effect */}
                <div
                  className={`absolute rounded-full animate-ripple ${
                    level === 0
                      ? "bg-amber-600/30"
                      : level === 1
                        ? "bg-gray-400/30"
                        : level === 2
                          ? "bg-yellow-400/30"
                          : "bg-blue-400/30"
                  }`}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />

                {/* +1 text */}
                <div
                  className={`absolute font-bold text-2xl animate-floatUp ${
                    level === 0
                      ? "text-amber-600"
                      : level === 1
                        ? "text-gray-400"
                        : level === 2
                          ? "text-yellow-400"
                          : "text-blue-400"
                  }`}
                >
                  +1
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-4">
          <h2
            className={`text-2xl font-bold ${
              level === 0
                ? "text-amber-600"
                : level === 1
                  ? "text-gray-400"
                  : level === 2
                    ? "text-yellow-400"
                    : "text-blue-400"
            }`}
          >
            {levelNames[level]} Goblin
          </h2>
          <p className="text-[#e8d5b5]/70 mt-1">Click to earn points!</p>
        </div>
      </div>
    </div>
  )
}
