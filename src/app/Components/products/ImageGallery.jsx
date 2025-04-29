"use client"

import { useState } from "react"
import Image from "next/image"
import { ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import PropTypes from 'prop-types';

export default function ImageGallery({ product }) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!isZoomed) return
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPosition({ x, y })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-pink-100 dark:border-pink-800 p-4 shadow-sm transition-colors duration-300">
      <div 
        className="relative aspect-square bg-pink-50 dark:bg-pink-900/20 rounded-lg overflow-hidden mb-4 cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        {product?.image ? (
          <Image
            src={product.image}
            alt={product.name || "Product image"}
            width={800}
            height={600}
            className={cn(
              "object-contain transition-transform duration-300",
              isZoomed ? "scale-150" : "scale-100"
            )}
            style={{
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
            }}
            priority
          />
        ) : (
          <div className="w-full h-full bg-pink-100 dark:bg-pink-900/30 animate-pulse flex items-center justify-center">
            <span className="text-pink-700 dark:text-pink-300 text-sm font-medium px-4 py-2 rounded-lg bg-white/50 dark:bg-pink-900/50 backdrop-blur-sm">
              {product?.name ? `${product.name} image` : 'Product image coming soon'}
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-pink-600/80 text-white p-2 rounded-full hover:bg-pink-700/80 transition-colors">
          <ZoomIn size={20} />
        </div>
      </div>
    </div>
  )
}

ImageGallery.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string
  }).isRequired
};
