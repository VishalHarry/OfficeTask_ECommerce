"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function StickyCartBar({ product, onAddToCart }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    onAddToCart(quantity)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Product Info */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-md overflow-hidden border">
              <Image src={product.image ?? "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <div className="hidden sm:block">
              <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
              <div className="flex items-center gap-2">
                <span className="font-semibold">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Expand Button (Mobile Only) */}
          <button
            className="sm:hidden flex items-center gap-1 text-sm text-muted-foreground"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>{isExpanded ? "Less" : "More"}</span>
            <ChevronUp className={cn("transition-transform", isExpanded ? "rotate-0" : "rotate-180")} size={16} />
          </button>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center border rounded-md">
              <button
                className="px-3 py-1 border-r"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-3 py-1 min-w-[40px] text-center">{quantity}</span>
              <button
                className="px-3 py-1 border-l"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
            <Button size="sm" className="gap-1" onClick={handleAddToCart} disabled={!product.inStock}>
              Add to Cart
            </Button>
            <Button size="sm" className="gap-1 bg-amber-500 hover:bg-amber-600" disabled={!product.inStock}>
              Buy Now
            </Button>
          </div>
        </div>

        {/* Expanded Content (Mobile Only) */}
        {isExpanded && (
          <div className="sm:hidden mt-3 pt-3 border-t">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{product.name}</h3>
              <div className="flex items-center gap-2">
                <span className="font-semibold">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center border rounded-md">
                <button
                  className="px-3 py-1 border-r"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-3 py-1 min-w-[40px] text-center">{quantity}</span>
                <button
                  className="px-3 py-1 border-l"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className={product.inStock ? "text-green-600" : "text-red-500"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
