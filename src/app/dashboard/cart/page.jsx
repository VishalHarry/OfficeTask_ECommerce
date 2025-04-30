"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"

import Image from "next/image"
import ConfirmationDialog from "@/app/Components/ConfirmationDialog"

export default function CartPage() {
  // Add mounted state for handling theme
  const [mounted, setMounted] = useState(false)

  // Use useEffect to handle mounting state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Organic Cotton Pads",
      price: 19.99,
      quantity: 2,
      image: "https://imgs.search.brave.com/tHQDwZGTAKUve7PXALUXEhIg0bgzEKpXu4cjQzHu4XE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z2V0cmFlbC5jb20v/Y2RuL3Nob3AvZmls/ZXMvT1JHQU5JQ19D/T1RUT05fQ09WRVJf/UEFEU19SQUVMLVJH/LTAyX0RUQ19SRUdV/TEFSXzI4X0NPVU5U/X1BPTFlfRlJPTlRf/N2E3OTUyOTQtMjJi/NS00NGQzLTk4ZjMt/NGE4NzA4OGQ0OGY4/LndlYnA_dj0xNzM4/Nzk5OTU4JndpZHRo/PTIwNDg",
      color: "White",
      size: "Regular",
    },
    {
      id: 2,
      name: "Biodegradable Panty Liners",
      price: 9.99,
      quantity: 1,
      image: "https://imgs.search.brave.com/L_ia0_fNVDGp5wnmI5ZsHCoRw9WWI8Pdtyb-2ZTAP6Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/am9zYXBhZHMuY29t/L2Nkbi9zaG9wL2Zp/bGVzLzE4LTEud2Vi/cD92PTE2ODcxNjUw/Njkmd2lkdGg9MTk0/Ng",
      color: "Green",
      size: "Small",
    },
    {
      id: 3,
      name: "Reusable Menstrual Cup",
      price: 39.97,
      quantity: 1,
      image: "https://imgs.search.brave.com/JX6rN-LubYiO0uGMOLVYKIVA6X1Cm7wuaK21lCu_4EM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vRmxl/eC1SZXVzYWJsZS1N/ZW5zdHJ1YWwtRGlz/Yy0xLUNvdW50LUNh/cGFjaXR5LTcwbUxf/NGYwY2Q0YTktMWEx/NS00NWQ0LTk5ZGYt/NWM2NGQ3NjhjNWM3/LjY5NWZkMzIwMDEz/MTk0MWFkOTMxMGY2/N2ZjMzllNGViLmpw/ZWc_b2RuSGVpZ2h0/PTU4MCZvZG5XaWR0/aD01ODAmb2RuQmc9/RkZGRkZG",
      color: "Pink",
      size: "Medium",
    },
  ])

  const [itemToRemove, setItemToRemove] = useState(null)
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false)
  // const { toast } = useToast()

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
  }

  const confirmRemoveItem = (itemId) => {
    setItemToRemove(itemId)
    setShowRemoveConfirm(true)
  }

  const removeItem = () => {
    if (itemToRemove) {
      setCartItems(cartItems.filter((item) => item.id !== itemToRemove))
      // toast({
      //   title: "Item removed",
      //   description: "The item has been removed from your cart.",
      // })
      setItemToRemove(null)
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0 // Free shipping
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white transition-colors duration-300">Shopping Cart</h2>

          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Cart Items */}
              <div className="flex-1">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row border border-gray-200 dark:border-gray-700 rounded-lg p-4 gap-4 bg-white dark:bg-gray-800 transition-colors duration-300"
                    >
                      {/* Product Image */}
                      <div className="w-full sm:w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0 mx-auto sm:mx-0 transition-colors duration-300">
                        <div className="relative w-full h-full">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="100vw"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <h3 className="font-medium mb-1 text-gray-900 dark:text-white transition-colors duration-300">{item.name}</h3>
                          <div className="font-semibold sm:text-right text-gray-900 dark:text-white transition-colors duration-300">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>

                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 transition-colors duration-300">
                          {item.color && <span>{item.color}</span>}
                          {item.color && item.size && <span> • </span>}
                          {item.size && <span>Size {item.size}</span>}
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden transition-colors duration-300">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 py-1 border-x border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => confirmRemoveItem(item.id)}
                            className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300 flex items-center"
                          >
                            <Trash2 size={16} className="mr-1" />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-80 mt-6 lg:mt-0">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 transition-colors duration-300">
                  <h3 className="font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Order Summary</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Subtotal</span>
                      <span className="text-gray-900 dark:text-white transition-colors duration-300">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Shipping</span>
                      <span className="text-gray-900 dark:text-white transition-colors duration-300">{shipping === 0 ? "Free" : `${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Tax</span>
                      <span className="text-gray-900 dark:text-white transition-colors duration-300">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mb-4 transition-colors duration-300">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-900 dark:text-white transition-colors duration-300">Total</span>
                      <span className="text-gray-900 dark:text-white transition-colors duration-300">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center">
                    <ShoppingBag size={18} className="mr-2" />
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center transition-colors duration-300">
                <ShoppingBag size={24} className="text-gray-400 dark:text-gray-500 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white transition-colors duration-300">Your cart is empty</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 transition-colors duration-300">Looks like you haven&apos;t added any products to your cart yet</p>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300">
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Remove from Cart Confirmation */}
      <ConfirmationDialog
        isOpen={showRemoveConfirm}
        onClose={() => setShowRemoveConfirm(false)}
        onConfirm={removeItem}
        title="Remove from Cart"
        description="Are you sure you want to remove this item from your cart?"
        confirmText="Yes, remove"
      />
    </div>
  )
}