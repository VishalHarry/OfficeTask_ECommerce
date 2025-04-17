"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import {toast} from "sonner"

export default function ProductCard({ product, onQuickView }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
//   const { toast } = useToast()

  const handleAddToCart = (e) => {
    e.stopPropagation()
    // toast({
    //   title: "Added to cart",
    //   description: `${product.name} has been added to your cart.`,
    // })
    toast.success(`${product.name} has been added to your cart.`)
  }

  const handleToggleWishlist = (e) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    // toast({
    //   title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
    //   description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    // })
    toast.success(`${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`)
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
    <div
      className={cn(
        "group bg-background border border-border rounded-lg overflow-hidden transition-all duration-300",
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
          {product.tags.includes("new") && <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>}
          {product.tags.includes("bestseller") && <Badge className="bg-amber-500 hover:bg-amber-600">Bestseller</Badge>}
          {product.tags.includes("sale") && <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>}
        </div>

        {/* Quick View Button */}
        <div
          className={cn(
            "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        >
          <Button variant="secondary" size="sm" className="gap-1" onClick={() => onQuickView(product)}>
            <Eye size={16} />
            Quick View
          </Button>
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
          <Button className="flex-1 gap-1 group/cart-btn" size="sm" onClick={handleAddToCart}>
            <ShoppingCart size={16} className="transition-transform group-hover/cart-btn:animate-bounce" />
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
      </div>
    </div>
  )
}
