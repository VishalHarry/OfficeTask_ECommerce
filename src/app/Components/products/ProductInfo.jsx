"use client"

import { useState } from "react"
import { Star, Heart, Check, Info, Truck, RefreshCw, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function ProductInfo({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null)
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null)
  const [pincode, setPincode] = useState("")
  const [deliveryInfo, setDeliveryInfo] = useState(null)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(10, value))
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    onAddToCart(quantity)
  }

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const checkDelivery = () => {
    // Simulate delivery check
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setDeliveryInfo({
        available: true,
        eta: `${Math.floor(Math.random() * 3) + 2}-${Math.floor(Math.random() * 3) + 4} days`,
        cod: Math.random() > 0.3,
      })
    } else {
      setDeliveryInfo({
        available: false,
        message: "Please enter a valid 6-digit pincode",
      })
    }
  }

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={18}
          className={cn(
            "transition-colors",
            i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
          )}
        />
      ))
  }

  const truncatedDescription = product.description?.substring(0, 150)
  const shouldTruncate = product.description?.length > 150

  return (
    <div className="space-y-6">
      {/* Title and Rating */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

        <div className="flex items-center mt-2 gap-2">
          <div className="flex items-center">
            {renderStars(product.rating)}
            <span className="ml-2 text-sm font-medium">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.ratingCount} reviews)</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-2xl md:text-3xl font-bold">₹{product.price.toLocaleString()}</span>
        {product.originalPrice && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
            <Badge className="bg-green-500 hover:bg-green-600">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </Badge>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div>
        {product.inStock ? (
          <div className="flex items-center text-green-600">
            <Check size={16} className="mr-1" />
            <span className="font-medium">In Stock</span>
          </div>
        ) : (
          <div className="flex items-center text-red-500">
            <Info size={16} className="mr-1" />
            <span className="font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
        <p className="text-sm">
          {shouldTruncate && !isDescriptionExpanded ? `${truncatedDescription}...` : product.description}
          {shouldTruncate && (
            <button
              className="ml-1 text-primary font-medium"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              {isDescriptionExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </p>
      </div>

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Color</h3>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                className={cn(
                  "w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center",
                  selectedColor === color ? "border-primary" : "border-gray-200",
                )}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select ${color} color`}
              >
                <span className="w-8 h-8 rounded-full" style={{ backgroundColor: color.toLowerCase() }} />
                {selectedColor === color && (
                  <Check
                    size={16}
                    className="absolute text-white drop-shadow-md"
                    style={{
                      filter: ["White", "Yellow", "Beige"].includes(color)
                        ? "drop-shadow(0 0 1px rgba(0,0,0,0.5))"
                        : "none",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Size</h3>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={cn(
                  "w-12 h-12 rounded-md border-2 flex items-center justify-center transition-all",
                  selectedSize === size
                    ? "border-primary bg-primary/5 text-primary font-medium"
                    : "border-gray-200 hover:border-gray-300",
                )}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Quantity</h3>
        <div className="flex items-center w-32">
          <Button
            variant="outline"
            size="icon"
            className="rounded-r-none"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <Input
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
            className="h-10 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Button
            variant="outline"
            size="icon"
            className="rounded-l-none"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= 10}
          >
            +
          </Button>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 gap-2 h-12 text-base bg-pink-600 hover:bg-pink-700" onClick={handleAddToCart} disabled={!product.inStock}>
          🛒 Add to Cart
        </Button>
        <Button
          variant="default"
          className="flex-1 gap-2 h-12 text-base bg-amber-500 hover:bg-amber-600"
          disabled={!product.inStock}
        >
          ⚡ Buy Now
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "h-12 w-12 transition-colors",
            isWishlisted && "text-red-500 border-red-200 hover:text-red-600 hover:border-red-300",
          )}
          onClick={handleToggleWishlist}
        >
          <Heart size={20} className={cn("transition-all", isWishlisted && "fill-red-500")} />
        </Button>
      </div>

      {/* Offers Section */}
      <div className="bg-muted/50 p-4 rounded-lg border">
        <h3 className="font-medium mb-2">Available Offers</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <Badge className="mt-0.5 bg-amber-500 hover:bg-amber-600">BANK10</Badge>
            <span>10% off on HDFC Bank Credit Cards, up to ₹1,500 on orders above ₹5,000</span>
          </li>
          <li className="flex items-start gap-2">
            <Badge className="mt-0.5 bg-blue-500 hover:bg-blue-600">WELCOME</Badge>
            <span>Get 5% cashback on your first order</span>
          </li>
          <li className="flex items-start gap-2">
            <Badge className="mt-0.5 bg-green-500 hover:bg-green-600">FREE SHIP</Badge>
            <span>Free shipping on all orders above ₹499</span>
          </li>
        </ul>
      </div>

      {/* Delivery Info */}
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-3">Delivery Information</h3>
        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Enter Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-40"
            maxLength={6}
          />
          <Button variant="outline" onClick={checkDelivery}>
            Check
          </Button>
        </div>

        {deliveryInfo && (
          <div className="text-sm">
            {deliveryInfo.available ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-green-600">
                  <Check size={16} />
                  <span>Delivery available to your area</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={16} />
                  <span>Estimated delivery in {deliveryInfo.eta}</span>
                </div>
                {deliveryInfo.cod && (
                  <div className="flex items-center gap-2">
                    <Check size={16} />
                    <span>Cash on Delivery available</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-red-500">{deliveryInfo.message}</div>
            )}
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div className="flex flex-col items-center gap-1">
          <RefreshCw size={20} className="text-muted-foreground" />
          <span className="font-medium">7-Day Returns</span>
          <span className="text-xs text-muted-foreground">Easy returns policy</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Shield size={20} className="text-muted-foreground" />
          <span className="font-medium">100% Authentic</span>
          <span className="text-xs text-muted-foreground">Genuine products</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Truck size={20} className="text-muted-foreground" />
          <span className="font-medium">Free Shipping</span>
          <span className="text-xs text-muted-foreground">On orders over ₹499</span>
        </div>
      </div>
    </div>
  )
}
