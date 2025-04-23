"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function RelatedProducts({ products }) {
  const scrollContainerRef = useRef(null)

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">You May Also Like</h2>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => scroll("left")}>
            <ChevronLeft size={18} />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scroll("right")}>
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      <div ref={scrollContainerRef} className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-thin">
        {products.map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

function RelatedProductCard({ product }) {
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={12}
          className={cn(
            "transition-colors",
            i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
          )}
        />
      ))
  }

  return (
    <Link href={`/product/${product.id}`} passHref>
      <div className="min-w-[240px] w-[240px] snap-start border rounded-lg overflow-hidden bg-background hover:shadow-md transition-shadow">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

          {/* Tags */}
          <div className="absolute top-2 left-2">
            {product.tags?.includes("sale") && <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 rounded-full w-8 h-8"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              // Add wishlist functionality
            }}
          >
            <Heart size={16} />
          </Button>
        </div>

        {/* Product Info */}
        <div className="p-3">
          <div className="flex items-center gap-1 mb-1">
            {renderStars(product.rating)}
            <span className="text-xs text-muted-foreground ml-1">({product.ratingCount})</span>
          </div>

          <h3 className="font-medium text-sm mb-1 line-clamp-2 h-10">{product.name}</h3>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
