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
  // const { toast } = useToast()

  const handleAddToCart = (e) => {
    e.preventDefault() // Prevent navigation when clicking the cart button
    e.stopPropagation()
    // toast({
    //   title: "Added to cart",
    //   description: `${product.name} has been added to your cart.`,
    // })
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault() // Prevent navigation when clicking the wishlist button
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    // toast({
    //   title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
    //   description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    // })
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
          "group bg-background border border-border rounded-lg overflow-hidden transition-all duration-300 cursor-pointer",
          isHovered ? "shadow-lg transform -translate-y-1" : "shadow-sm",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className={cn("object-cover transition-transform duration-500", isHovered ? "scale-110" : "scale-100")}
          />

          {/* Tags */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.tags?.includes("new") && <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>}
            {product.tags?.includes("bestseller") && (
              <Badge className="bg-amber-500 hover:bg-amber-600">Bestseller</Badge>
            )}
            {product.tags?.includes("sale") && <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center gap-1 mb-1">
            {renderStars(product.rating)}
            <span className="text-xs text-muted-foreground ml-1">({product.ratingCount})</span>
          </div>

          <h3 className="font-medium text-base mb-1 line-clamp-2 h-12">{product.name}</h3>

          <div className="flex items-center gap-2 mb-3">
            <span className="font-semibold">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-xs text-green-600 font-medium">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% off
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button className="flex-1 gap-1" size="sm" onClick={handleAddToCart}>
              <ShoppingCart size={16} />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "transition-colors",
                isWishlisted && "text-red-500 border-red-200 hover:text-red-600 hover:border-red-300",
              )}
              onClick={handleToggleWishlist}
            >
              <Heart size={16} className={cn("transition-all", isWishlisted && "fill-red-500")} />
            </Button>
          </div>

          {/* See Details Button */}
          <Button
            variant="secondary"
            className="w-full mt-2 gap-1"
            size="sm"
            onClick={(e) => e.preventDefault()} // This is just to show the button interaction
          >
            <ExternalLink size={16} />
            See Details
          </Button>
        </div>
      </div>
    </Link>
  )
}
