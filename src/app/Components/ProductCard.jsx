"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Heart, ShoppingCart, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={14}
          className={cn(
            "transition-colors",
            i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
          )}
        />
      ))
  }

  return (
    <Link href={`/productDetails/${product.id}`} passHref>
      <div
        className={cn(
          "group bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-900 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer hover:border-pink-200 dark:hover:border-pink-800",
          isHovered ? "shadow-lg shadow-pink-100/50 dark:shadow-pink-900/30 transform -translate-y-1" : "shadow-sm"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden bg-pink-50 dark:bg-pink-900/20">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className={cn("object-cover transition-transform duration-500", isHovered ? "scale-110" : "scale-100")}
          />

          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.tags?.includes("new") && (
              <Badge className="bg-pink-500 hover:bg-pink-600 text-white">New</Badge>
            )}
            {product.tags?.includes("bestseller") && (
              <Badge className="bg-purple-500 hover:bg-purple-600 text-white">Bestseller</Badge>
            )}
            {product.tags?.includes("sale") && (
              <Badge className="bg-rose-500 hover:bg-rose-600 text-white">Sale</Badge>
            )}
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-1 mb-1">
            {renderStars(product.rating)}
            <span className="text-xs text-pink-600/70 dark:text-pink-300/70 ml-1">({product.ratingCount})</span>
          </div>

          <h3 className="font-medium text-base mb-1 line-clamp-2 h-12 text-gray-900 dark:text-white">{product.name}</h3>

          <div className="flex items-center gap-2 mb-3">
            <span className="font-semibold text-pink-600 dark:text-pink-300">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-pink-400/70 dark:text-pink-500/70 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% off
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button 
              className="flex-1 gap-1 bg-pink-600 hover:bg-pink-700 text-white" 
              size="sm" 
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "transition-colors border-pink-200 dark:border-pink-800",
                isWishlisted ? "text-rose-500 hover:text-rose-600" : "text-pink-600 hover:text-pink-700"
              )}
              onClick={handleToggleWishlist}
            >
              <Heart size={16} className={cn("transition-all", isWishlisted && "fill-rose-500")} />
            </Button>
          </div>

          <Button
            variant="secondary"
            className="w-full mt-2 gap-1 bg-pink-50 hover:bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:hover:bg-pink-900/30 dark:text-pink-300"
            size="sm"
            onClick={(e) => e.preventDefault()}
          >
            <ExternalLink size={16} />
            See Details
          </Button>
        </div>
      </div>
    </Link>
  )
}
