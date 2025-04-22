"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

export default function WishlistPage() {
  // Mock wishlist data
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      image: "/placeholder.svg?height=200&width=200",
      color: "Black",
      size: "M",
    },
    {
      id: 2,
      name: "Designer Slim Fit Jeans",
      price: 69.99,
      image: "/placeholder.svg?height=200&width=200",
      color: "Blue",
      size: "32",
    },
    {
      id: 3,
      name: "Lightweight Running Shoes",
      price: 89.97,
      image: "/placeholder.svg?height=200&width=200",
      color: "Gray/Red",
      size: "10",
    },
    {
      id: 4,
      name: "Wireless Bluetooth Headphones",
      price: 129.99,
      image: "/placeholder.svg?height=200&width=200",
      color: "Black",
      size: "One Size",
    },
  ])

  const removeFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemId))
  }

  const addToCart = (itemId) => {
    // Add to cart logic would go here
    console.log(`Added item ${itemId} to cart`)
    // Optionally remove from wishlist
    // removeFromWishlist(itemId);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">My Wishlist</h2>
            <span className="text-gray-500">{wishlistItems.length} items</span>
          </div>

          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Heart size={18} fill="currentColor" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium mb-1 line-clamp-1">{item.name}</h3>
                    <div className="text-sm text-gray-600 mb-2">
                      {item.color && <span>{item.color}</span>}
                      {item.color && item.size && <span> • </span>}
                      {item.size && <span>Size {item.size}</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">${item.price.toFixed(2)}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-1.5 text-gray-500 hover:text-red-500 transition-colors"
                          aria-label="Remove"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => addToCart(item.id)}
                          className="p-1.5 text-primary hover:text-primary-dark transition-colors"
                          aria-label="Add to cart"
                        >
                          <ShoppingCart size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Heart size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-6">Items added to your wishlist will appear here</p>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
