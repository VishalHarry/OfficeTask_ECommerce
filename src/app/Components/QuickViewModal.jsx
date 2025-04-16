"use client"

import { Badge } from "@/components/ui/badge"

import { useEffect } from "react"
import Image from "next/image"
import { Star, X, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ProductQuickView({ product, isOpen, onClose }) {

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  const handleAddToCart = () => {
    // toast({
    //   title: "Added to cart",
    //   description: `${product.name} has been added to your cart.`,
    // })
  }

  const handleAddToWishlist = () => {
    // toast({
    //   title: "Added to wishlist",
    //   description: `${product.name} has been added to your wishlist.`,
    // })
  }

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={cn(i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300")}
        />
      ))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-200">
      <div className="absolute inset-0 z-0" onClick={onClose}></div>

      <div
        className="bg-background rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto z-10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <Button variant="ghost" size="icon" className="absolute right-2 top-2 z-10" onClick={onClose}>
            <X size={20} />
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="relative aspect-square bg-muted">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>

            {/* Product Info */}
            <div className="p-6 md:pr-8 flex flex-col">
              <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm text-muted-foreground">({product.ratingCount} reviews)</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
                {product.originalPrice && (
                  <span className="text-sm text-green-600 font-medium">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                  </span>
                )}
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium mb-1">Description</h3>
                <p className="text-muted-foreground text-sm">{product.description}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium mb-1">Availability</h3>
                <p className={`text-sm ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>

              {product.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-1">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto space-y-3">
                <Button className="w-full gap-2" onClick={handleAddToCart} disabled={!product.inStock}>
                  <ShoppingCart size={18} />
                  Add to Cart
                </Button>
                <Button variant="outline" className="w-full gap-2" onClick={handleAddToWishlist}>
                  <Heart size={18} />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
