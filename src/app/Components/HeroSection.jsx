"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function HeroSection() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-pink-30 to-pink-60">
      {/* Main Content */}
      <div className="container mx-auto h-screen flex items-center px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full">
              <Heart className="w-4 h-4 text-pink-500" />
              <span className="text-pink-700 text-sm font-medium">Gentle Care for You</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-pink-950 leading-tight">
              Comfort & Confidence,{" "}
              <span className="text-pink-700">Every Day</span>
            </h1>
            
            <p className="text-lg text-pink-700/80 max-w-lg">
              Explore our range of ultra-soft, rash-free sanitary pads designed with your comfort in mind.
            </p>
            
            <Button 
              size="lg"
              className={cn(
                "rounded-full text-lg px-8 py-6 bg-pink-600 hover:bg-pink-700 transition-all duration-300",
                "group relative overflow-hidden",
                isHovered && "shadow-lg shadow-pink-200"
              )}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => router.push("/product")}
            >
              <span className="relative z-10 flex items-center">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className={cn(
                "absolute inset-0 bg-pink-500 transform transition-transform duration-300",
                isHovered ? "scale-x-100" : "scale-x-0",
                "origin-left"
              )} />
            </Button>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-12">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-pink-800">
                <div className="font-medium">Dermatologically Tested</div>
                <div className="text-sm text-pink-600">Safe for sensitive skin</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-pink-800">
                <div className="font-medium">100% Cotton Top Layer</div>
                <div className="text-sm text-pink-600">Ultimate comfort</div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Image */}
          <div className="relative h-[600px] w-full hidden lg:block">
            <div className="absolute inset-0 bg-pink-200/20 rounded-full blur-3xl transform -rotate-6" />
            <Image
              src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExem51eW5jczQ2c2theGpjM2g0MHBhZnZlaDU4enN0N2Fkdm5jcHpqbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Co3dKAAI4ZGEBMD2DI/giphy.gif"
              alt="Premium Sanitary Pad"
              fill
              className="object-contain transform hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-pink-100/50 rounded-bl-full -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-pink-100/50 rounded-tr-full -z-10" />
    </div>
  )
}
