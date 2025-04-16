"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
const router=useRouter();
  const slides = [
    {
      image: "https://img.freepik.com/premium-photo/top-view-online-shopping-concept-with-credit-card-smart-phone-computer-isolated-office-yellow-table-background_315337-3591.jpg?w=1380",
      title: "Discover Your Style",
      subtitle: "Premium quality products with free worldwide shipping and returns",
      cta: "Explore Collection",
    },
    {
      image: "https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-132679.jpg?t=st=1744770149~exp=1744773749~hmac=3493f5fdb13fe720b7c32b23b0519b6ce60c065c0dbd5151cee0fbc9bd84bf27&w=1380",
      title: "Summer Essentials",
      subtitle: "Beat the heat with our curated selection of summer must-haves",
      cta: "Shop Now",
    },
    {
      image: "https://img.freepik.com/premium-photo/world-sale-internet-sales-concept-supermarket-cart-with-earth-globe-blue-background-world-trade-delivery-purchases_90380-743.jpg?w=1380",
      title: "New Arrivals",
      subtitle: "Be the first to experience our latest products and designs",
      cta: "View New Items",
    },
  ]

  useEffect(() => {
    setIsLoaded(true)

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Images with Zoom Effect */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-all duration-1000",
            isLoaded ? "scale-105" : "scale-100",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0",
          )}
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-20" />

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center text-white z-30">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "transition-all duration-700 absolute inset-0 flex flex-col items-center justify-center",
              index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{slide.title}</h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8 text-white/90">{slide.subtitle}</p>
            <Button size="lg" className="rounded-full text-lg px-8 group" onClick={()=>{router.push("/product")}}>
              {slide.cta}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        ))}
      </div>
    
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/80",
            )}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Store Open Badge */}
      <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full flex items-center animate-pulse z-30">
        <span className="h-2 w-2 bg-white rounded-full mr-2"></span>
        <span className="text-sm font-medium">Store is Open</span>
      </div>
    </div>
  )
}
