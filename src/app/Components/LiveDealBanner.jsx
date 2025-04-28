"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LiveDealBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 1,
    minutes: 58,
    seconds: 45,
  })

  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newSeconds = prev.seconds - 1

        if (newSeconds < 0) {
          const newMinutes = prev.minutes - 1

          if (newMinutes < 0) {
            const newHours = prev.hours - 1

            if (newHours < 0) {
              // Timer finished
              clearInterval(timer)
              return { hours: 0, minutes: 0, seconds: 0 }
            }

            return { hours: newHours, minutes: 59, seconds: 59 }
          }

          return { ...prev, minutes: newMinutes, seconds: 59 }
        }

        return { ...prev, seconds: newSeconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format time with leading zeros
  const formatTime = (value) => {
    return value.toString().padStart(2, "0")
  }

  return (
    <div className="hidden sm:block w-full bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100 text-pink-900">
      <div
        className={cn(
          "container mx-auto px-4 py-3 flex items-center justify-center text-center transition-transform duration-300",
          isHovered && "animate-shake",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center">
          <span className="mr-2 text-xl">🔥</span>
          <Clock className="h-4 w-4 mr-2" />
          <span className="font-medium">
            Flash Sale Ends In:{" "}
            <span className="font-bold">
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
            </span>
          </span>

          <Link
            href="/product" // Update this path to your actual shop route
            className="ml-4 text-white hover:bg-white/20 rounded-full group text-sm px-3 py-1.5 inline-flex items-center transition-colors"
          >
            Shop Now
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
