"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
    <div className="hidden sm:block w-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white">
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
          <Button variant="ghost" size="sm" className="ml-4 text-white hover:bg-white/20 rounded-full group">
            Shop Now
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
