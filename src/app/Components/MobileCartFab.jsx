"use client"

import { useState, useEffect } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function MobileCartFab() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Determine scroll direction
      setIsScrollingUp(currentScrollY < lastScrollY)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 transition-all duration-300 md:hidden",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0",
        isScrollingUp ? "translate-y-0" : "translate-y-20",
      )}
    >
      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
      >
        <ShoppingCart className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          3
        </span>
      </Button>
    </div>
  )
}
