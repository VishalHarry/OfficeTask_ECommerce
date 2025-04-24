"use client"

import { useState, useEffect } from "react"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export default function WishlistPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Use useEffect to handle mounting state
  useEffect(() => {
    setMounted(true)
  }, [])

  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Premium Leather Jacket",
      price: 199.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Outerwear",
      inStock: true,
    },
    {
      id: 2,
      name: "Wireless Noise-Cancelling Headphones",
      price: 149.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Electronics",
      inStock: true,
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Clothing",
      inStock: false,
    },
    {
      id: 4,
      name: "Smart Watch Series 5",
      price: 299.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Electronics",
      inStock: true,
    },
  ])

  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    itemId: null,
  })

  const [quickViewItem, setQuickViewItem] = useState(null)

  const handleRemoveItem = (id) => {
    setConfirmationDialog({
      isOpen: true,
      itemId: id,
    })
  }

  const confirmRemove = () => {
    if (confirmationDialog.itemId) {
      setWishlistItems(wishlistItems.filter((item) => item.id !== confirmationDialog.itemId))
      setConfirmationDialog({ isOpen: false, itemId: null })
    }
  }

  const handleQuickView = (item) => {
    setQuickViewItem(item)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">My Wishlist</h1>
        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">{wishlistItems.length} items</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center transition-colors duration-300">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-gray-300 dark:text-gray-600 transition-colors duration-300" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300">Your wishlist is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-300">Items added to your wishlist will appear here</p>
          <Button>Continue Shopping</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="relative">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                    aria-label="Remove from wishlist"
                  >
                    <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                  </button>
                  <button
                    onClick={() => handleQuickView(item)}
                    className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                    aria-label="Quick view"
                  >
                    <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
                  </button>
                </div>
                {!item.inStock && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Out of Stock
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1 text-gray-900 dark:text-white transition-colors duration-300">{item.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 transition-colors duration-300">{item.category}</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">${item.price.toFixed(2)}</p>
                  <Button size="sm" disabled={!item.inStock} className="flex items-center gap-1">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmationDialog.isOpen}
        onOpenChange={(open) => setConfirmationDialog({ ...confirmationDialog, isOpen: open })}
      >
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white transition-colors duration-300">Remove from Wishlist</DialogTitle>
          </DialogHeader>
          <p className="py-4 text-gray-700 dark:text-gray-300 transition-colors duration-300">Are you sure you want to remove this item from your wishlist?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmationDialog({ isOpen: false, itemId: null })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmRemove}>
              Yes, remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick View Modal */}
      {quickViewItem && mounted && (
        <Dialog open={!!quickViewItem} onOpenChange={(open) => !open && setQuickViewItem(null)}>
          <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800 transition-colors duration-300">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white transition-colors duration-300">Product Details</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={quickViewItem.image || "/placeholder.svg"}
                  alt={quickViewItem.name}
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">{quickViewItem.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">{quickViewItem.category}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">${quickViewItem.price.toFixed(2)}</p>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${quickViewItem.inStock ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{quickViewItem.inStock ? "In Stock" : "Out of Stock"}</p>
                </div>
                <div className="pt-4 space-y-2">
                  <Button className="w-full" disabled={!quickViewItem.inStock}>
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => handleRemoveItem(quickViewItem.id)}>
                    Remove from Wishlist
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}