"use client"

import { useState } from "react"

import ProductCard from "./ProductCard"
import ProductSkeleton from "./ProductSkeleton"
import Pagination from "./Pagination"

const ITEMS_PER_PAGE = 12

export default function ProductGrid({ products, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = products.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Scroll to top of product grid
    window.scrollTo({
      top: document.getElementById("product-grid").offsetTop - 100,
      behavior: "smooth",
    })
  }

  return (
    <div id="product-grid">
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to find what you&apos;re looking for.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
