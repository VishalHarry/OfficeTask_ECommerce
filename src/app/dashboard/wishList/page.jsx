"use client"

import { useState, useEffect } from "react"
import { Heart, ShoppingCart, Eye, ExternalLink } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

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
      name: "Organic Cotton Pads",
      price: 19.99,
      image: "https://imgs.search.brave.com/tHQDwZGTAKUve7PXALUXEhIg0bgzEKpXu4cjQzHu4XE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z2V0cmFlbC5jb20v/Y2RuL3Nob3AvZmls/ZXMvT1JHQU5JQ19D/T1RUT05fQ09WRVJf/UEFEU19SQUVMLVJH/LTAyX0RUQ19SRUdV/TEFSXzI4X0NPVU5U/X1BPTFlfRlJPTlRf/N2E3OTUyOTQtMjJi/NS00NGQzLTk4ZjMt/NGE4NzA4OGQ0OGY4/LndlYnA_dj0xNzM4/Nzk5OTU4JndpZHRo/PTIwNDg",
      category: "Feminine Hygiene",
      inStock: true,
    },
    {
      id: 2,
      name: "Biodegradable Panty Liners",
      price: 9.99,
      image: "https://imgs.search.brave.com/L_ia0_fNVDGp5wnmI5ZsHCoRw9WWI8Pdtyb-2ZTAP6Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/am9zYXBhZHMuY29t/L2Nkbi9zaG9wL2Zp/bGVzLzE4LTEud2Vi/cD92PTE2ODcxNjUw/Njkmd2lkdGg9MTk0/Ng",
      category: "Feminine Hygiene",
      inStock: true,
    },
    {
      id: 3,
      name: "Reusable Menstrual Cup",
      price: 39.97,
      image: "https://imgs.search.brave.com/JX6rN-LubYiO0uGMOLVYKIVA6X1Cm7wuaK21lCu_4EM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vRmxl/eC1SZXVzYWJsZS1N/ZW5zdHJ1YWwtRGlz/Yy0xLUNvdW50LUNh/cGFjaXR5LTcwbUxf/NGYwY2Q0YTktMWEx/NS00NWQ0LTk5ZGYt/NWM2NGQ3NjhjNWM3/LjY5NWZkMzIwMDEz/MTk0MWFkOTMxMGY2/N2ZjMzllNGViLmpw/ZWc_b2RuSGVpZ2h0/PTU4MCZvZG5XaWR0/aD01ODAmb2RuQmc9/RkZGRkZG",
      category: "Feminine Hygiene",
      inStock: false,
    },
    {
      id: 4,
      name: "Herbal Sanitary Pads",
      price: 12.75,
      image: "https://imgs.search.brave.com/74pNqYgTU_p4MEOfzj3vA7dkO8fRY_nKbsr_HgdmPNw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vVGhl/LUhvbmV5LVBvdC1D/b21wYW55LUhlcmJh/bC1TdXBlci1QYWRz/LXdpdGgtV2luZ3Mt/T3JnYW5pYy1Db3R0/b24tQ292ZXItMTYt/Y3RfNmQ5YTA1MmMt/OTA3Yi00MzU0LTkx/ODEtMGZlMjg5NTk4/MjI2LjkwNjQ3MTk0/YTI1NTM2ZGIyY2Zh/NmMwYjllMDM2MGQy/LnBuZz9vZG5IZWln/aHQ9NjQwJm9kbldp/ZHRoPTY0MCZvZG5C/Zz1GRkZGRkY",
      category: "Feminine Hygiene",
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
        <h1 className="text-2xl font-bold text-pink-950 dark:text-pink-100">My Wishlist</h1>
        <p className="text-pink-600/70 dark:text-pink-300/70">{wishlistItems.length} items</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-pink-100 dark:border-pink-800 p-8 text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-pink-300 dark:text-pink-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-pink-950 dark:text-pink-100">Your wishlist is empty</h2>
          <p className="text-pink-600/70 dark:text-pink-300/70 mb-6">Items added to your wishlist will appear here</p>
          <Button className="bg-pink-600 hover:bg-pink-700 text-white">Continue Shopping</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-900 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer hover:border-pink-200 dark:hover:border-pink-800 hover:shadow-lg hover:shadow-pink-100/50 dark:hover:shadow-pink-900/30 transform hover:-translate-y-1"
            >
              <div className="relative aspect-square overflow-hidden bg-pink-50 dark:bg-pink-900/20">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 left-2">
                  {!item.inStock && (
                    <Badge className="bg-rose-500 hover:bg-rose-600 text-white">Out of Stock</Badge>
                  )}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-base mb-1 line-clamp-2 h-12 text-pink-950 dark:text-pink-100">{item.name}</h3>
                <p className="text-sm text-pink-600/70 dark:text-pink-300/70 mb-3">{item.category}</p>

                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-pink-600 dark:text-pink-300">${item.price.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-rose-500 hover:text-rose-600 border-pink-200 dark:border-pink-800"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Heart size={16} className="fill-rose-500" />
                  </Button>
                </div>

                <Button
                  variant="secondary"
                  className="w-full mt-2 gap-1 bg-pink-50 hover:bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:hover:bg-pink-900/30 dark:text-pink-300"
                  size="sm"
                  onClick={() => handleQuickView(item)}
                >
                  <ExternalLink size={16} />
                  See Details
                </Button>
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
                <div className="relative w-full h-auto">
                  <Image
                    src={quickViewItem.image || "/placeholder.svg"}
                    alt={quickViewItem.name}
                    width={500} // Adjust this width based on your layout
                    height={300} // Adjust this height based on your layout
                    className="object-cover rounded-md"
                  />
                </div>
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