"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
// import { useToast } from "@/components/ui/use-toast"
import {toast} from "sonner"

// Mock product data
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=400",
    trending: true,
    stock: 15,
    description:
      "Experience crystal-clear sound with our premium wireless headphones. Features noise cancellation and 30-hour battery life.",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 149.99,
    rating: 4.5,
    image: "/placeholder.svg?height=400&width=400",
    trending: true,
    stock: 2,
    description:
      "Track your fitness goals with our advanced smart watch. Includes heart rate monitoring, GPS, and sleep tracking.",
  },
  {
    id: 3,
    name: "Leather Laptop Bag",
    price: 89.99,
    rating: 4.7,
    image: "/placeholder.svg?height=400&width=400",
    trending: false,
    stock: 8,
    description: "Stylish and durable leather laptop bag with multiple compartments for all your essentials.",
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    rating: 4.6,
    image: "/placeholder.svg?height=400&width=400",
    trending: true,
    stock: 1,
    description:
      "Waterproof portable speaker with 360° sound and 20-hour battery life. Perfect for outdoor adventures.",
  },
  {
    id: 5,
    name: "Minimalist Desk Lamp",
    price: 59.99,
    rating: 4.4,
    image: "/placeholder.svg?height=400&width=400",
    trending: false,
    stock: 12,
    description: "Modern desk lamp with adjustable brightness and color temperature. USB charging port included.",
  },
]

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const carouselRef = useRef(null)
  

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { current } = carouselRef
      const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setIsDialogOpen(true)
  }

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    // toast({
    //   title: "Added to cart",
    //   description: `${product.name} has been added to your cart.`,
    // })
    toast.success("Item Added to cart  `${product.name}`")
  }

  const handleAddToWishlist = (e, product) => {
    e.stopPropagation()
    // toast({
    //   title: "Added to wishlist",
    //   description: `${product.name} has been added to your wishlist.`,
    // })
    toast.success(`Item addded to wishliste ${product.name}`)
  }

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300")}
        />
      ))
  }

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Trending Products</h2>
          <p className="text-muted-foreground mt-1">Discover our most popular items</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" className="rounded-full" onClick={() => scroll("left")}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" onClick={() => scroll("right")}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {loading
          ? // Skeleton loaders
            Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="min-w-[250px] sm:min-w-[280px] snap-start animate-pulse">
                  <div className="bg-background rounded-lg border border-border overflow-hidden">
                    <div className="h-64 bg-muted"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-5 bg-muted rounded w-3/4"></div>
                      <div className="flex space-x-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <div key={i} className="h-4 w-4 bg-muted rounded-full"></div>
                          ))}
                      </div>
                      <div className="h-6 bg-muted rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))
          : products.map((product) => (
              <div key={product.id} className="min-w-[250px] sm:min-w-[280px] snap-start">
                <div className="bg-background rounded-lg border border-border overflow-hidden group cursor-pointer h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {product.trending && <Badge className="absolute top-2 left-2 bg-primary">Trending</Badge>}

                    {product.stock <= 2 && (
                      <div
                        className={cn(
                          "absolute top-0 right-0 bg-red-500 text-white py-1 px-4 transform rotate-45 translate-x-[30%] translate-y-[10%]",
                          product.stock === 1 && "animate-pulse",
                        )}
                      >
                        Only {product.stock} Left
                      </div>
                    )}

                    {/* Quick action buttons */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full"
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full"
                        onClick={(e) => handleAddToWishlist(e, product)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full"
                        onClick={() => handleProductClick(product)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        {renderStars(product.rating)}
                        <span className="ml-1 text-sm text-muted-foreground">({product.rating})</span>
                      </div>
                    </div>
                    <div className="font-bold text-lg">${product.price.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Product Preview Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedProduct && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
              <DialogDescription>{selectedProduct.description}</DialogDescription>
            </DialogHeader>

            <div className="grid sm:grid-cols-2 gap-6 mt-4">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    {renderStars(selectedProduct.rating)}
                    <span className="ml-1 text-sm text-muted-foreground">({selectedProduct.rating})</span>
                  </div>

                  <div className="font-bold text-2xl mb-4">${selectedProduct.price.toFixed(2)}</div>

                  {selectedProduct.stock <= 2 && (
                    <p className="text-red-500 text-sm mb-4">Only {selectedProduct.stock} items left in stock!</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Button className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart className="mr-2 h-4 w-4" />
                    Add to Wishlist
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}
