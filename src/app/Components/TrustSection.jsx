"use client"

import { useEffect, useRef, useState } from "react"
import { Truck, RefreshCw, Shield, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const trustItems = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $50",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day return policy",
    gradient: "from-purple-500 to-pink-400",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Protected by encryption",
    gradient: "from-amber-500 to-orange-400",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "We're always here to help",
    gradient: "from-green-500 to-emerald-400",
  },
]

export default function TrustSection() {
  const [visibleItems, setVisibleItems] = useState([])
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Stagger the animation of each item
          trustItems.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index])
            }, index * 200)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="rounded-xl overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Why Shop With Us</h2>
          <p className="text-muted-foreground mt-1">Benefits that make us stand out</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trustItems.map((item, index) => {
          const Icon = item.icon
          const isVisible = visibleItems.includes(index)

          return (
            <div
              key={index}
              className={cn(
                "bg-gradient-to-br p-8 rounded-lg text-white transition-all duration-500 transform opacity-0 translate-y-8 shadow-lg",
                `${item.gradient}`,
                isVisible && "opacity-100 translate-y-0",
              )}
            >
              <div className="bg-white/20 p-3 rounded-full w-fit mb-4">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-white/80">{item.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
