"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { getProductById, getRelatedProducts } from "@/lib/product-data"
import Breadcrumb from "@/app/Components/products/Breadcrumb"
import ImageGallery from "@/app/Components/products/ImageGallery"
import ProductInfo from "@/app/Components/products/ProductInfo"
import TabsSection from "@/app/Components/products/TabsSection"
import RelatedProducts from "@/app/Components/products/RelatedProducts"
import StickyCartBar from "@/app/Components/products/StickyCartBar"

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showStickyBar, setShowStickyBar] = useState(false)


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // In a real app, this would be an API call
        const productData = await getProductById(id)
        const related = await getRelatedProducts(productData.category)

        setProduct(productData)
        setRelatedProducts(related)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error)
        setLoading(false)
      }
    }

    fetchProduct()

    // Handle scroll for sticky bar
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const triggerPosition = 500 // Adjust based on your layout
      setShowStickyBar(scrollPosition > triggerPosition)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [id])

  const handleAddToCart = (quantity) => {
    // toast({
    //   title: "Added to cart!",
    //   description: `${quantity} × ${product.name} added to your cart`,
    //   duration: 3000,
    // })
  }

  if (loading) {
    return <ProductSkeleton />
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Breadcrumb
        paths={[
          { name: "Home", href: "/" },
          { name: product.category, href: `/category/${product.category}` },
          { name: product.subcategory, href: `/category/${product.category}/${product.subcategory}` },
          { name: product.name, href: `/product/${id}` },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ImageGallery images={product.images} />
        <ProductInfo product={product} onAddToCart={handleAddToCart} />
      </div>

      <div className="mt-12">
        <TabsSection product={product} />
      </div>

      <div className="mt-16">
        <RelatedProducts products={relatedProducts} />
      </div>

      {showStickyBar && <StickyCartBar product={product} onAddToCart={handleAddToCart} />}
    </div>
  )
}

function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="h-6 w-64 mb-8">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square rounded-lg overflow-hidden">
          <Skeleton className="h-full w-full" />
          <div className="mt-4 flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-20 w-20" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-4 items-center">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-full" />
          </div>
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>

      <div className="mt-12">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full mt-4" />
      </div>

      <div className="mt-16">
        <Skeleton className="h-8 w-64 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
