"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ImageGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  const handleThumbnailClick = (index) => {
    setActiveIndex(index)
  }

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleMouseMove = (e) => {
    if (!isZoomed) return

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x, y })
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative aspect-square rounded-lg overflow-hidden bg-muted border"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsFullscreen(true)}
      >
        <Image
          src={images[activeIndex] || "/placeholder.svg"}
          alt="Product image"
          fill
          className={cn("object-cover transition-transform duration-300", isZoomed ? "scale-150" : "scale-100")}
          style={
            isZoomed
              ? {
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }
              : {}
          }
        />

        {/* Zoom indicator */}
        <div className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full">
          <ZoomIn size={20} />
        </div>

        {/* Navigation arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full"
          onClick={(e) => {
            e.stopPropagation()
            handlePrevious()
          }}
        >
          <ChevronLeft size={20} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full"
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
        >
          <ChevronRight size={20} />
        </Button>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all",
              activeIndex === index ? "border-primary" : "border-transparent hover:border-gray-300",
            )}
            onClick={() => handleThumbnailClick(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-5xl w-[90vw] h-[90vh] p-0 bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={images[activeIndex] || "/placeholder.svg"}
              alt="Product image fullscreen"
              fill
              className="object-contain"
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full"
              onClick={() => setIsFullscreen(false)}
            >
              <X size={20} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full"
              onClick={handlePrevious}
            >
              <ChevronLeft size={24} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full"
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </Button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    activeIndex === index ? "bg-white" : "bg-white/30 hover:bg-white/60",
                  )}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
