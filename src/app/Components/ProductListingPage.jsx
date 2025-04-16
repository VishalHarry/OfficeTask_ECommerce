"use client"

import { useState, useEffect } from "react"

import { generateProducts } from "@/lib/product-data"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import FilterSidebar from "./FilterSidebar"
import SortBar from "./SortBar"
import MobileFilterDrawer from "./MobileFilterDrawer"
import ProductGrid from "./ProductGrid"

export default function ProductListingPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [100, 10000],
    ratings: 0,
    inStockOnly: false,
    tags: [],
  })
  const [sortOption, setSortOption] = useState("popularity")

  useEffect(() => {
    // Simulate API call to fetch products
    const fetchProducts = async () => {
      setIsLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const data = generateProducts(48)
      setProducts(data)
      setFilteredProducts(data)
      setIsLoading(false)
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    // Apply filters and sorting
    let result = [...products]

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter((product) => filters.categories.includes(product.category))
    }

    // Apply price range filter
    result = result.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Apply ratings filter
    if (filters.ratings > 0) {
      result = result.filter((product) => product.rating >= filters.ratings)
    }

    // Apply in-stock filter
    if (filters.inStockOnly) {
      result = result.filter((product) => product.inStock)
    }

    // Apply tags filter
    if (filters.tags.length > 0) {
      result = result.filter((product) => filters.tags.some((tag) => product.tags.includes(tag)))
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        result.sort((a, b) => b.price - a.price)
        break
      case "new-arrivals":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case "popularity":
      default:
        result.sort((a, b) => b.popularity - a.popularity)
        break
    }

    setFilteredProducts(result)
  }, [products, filters, sortOption])

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  const handleSortChange = (option) => {
    setSortOption(option)
  }

  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: [100, 10000],
      ratings: 0,
      inStockOnly: false,
      tags: [],
    })
  }

  const handleWishlistToggle = (productId) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter(id => id !== productId)
      } else {
        return [...prevWishlist, productId]
      }
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background pt-4 pb-2 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Our Products</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar with Scrollable Content */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-thin">
              <FilterSidebar filters={filters} onFilterChange={handleFilterChange} onReset={resetFilters} />
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <Button
              onClick={() => setIsMobileFilterOpen(true)}
              className="w-full flex items-center justify-center gap-2"
              variant="outline"
            >
              <SlidersHorizontal size={18} />
              Filter Products
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <SortBar totalResults={filteredProducts.length} sortOption={sortOption} onSortChange={handleSortChange} />

            <ProductGrid 
              products={filteredProducts} 
              isLoading={isLoading} 
              wishlist={wishlist} 
              onWishlistToggle={handleWishlistToggle}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />
    </div>
  )
}