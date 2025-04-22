"use client"

import { useState } from "react"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import ConfirmationDialog from "../../ConfirmationDialog"


export default function CartPage() {
  // Mock cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      quantity: 2,
      image: "/placeholder.svg?height=120&width=120",
      color: "Black",
      size: "M",
    },
    {
      id: 2,
      name: "Designer Slim Fit Jeans",
      price: 69.99,
      quantity: 1,
      image: "/placeholder.svg?height=120&width=120",
      color: "Blue",
      size: "32",
    },
    {
      id: 3,
      name: "Lightweight Running Shoes",
      price: 89.97,
      quantity: 1,
      image: "/placeholder.svg?height=120&width=120",
      color: "Gray/Red",
      size: "10",
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Shopping Cart</h2>

          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Cart Items */}
              <div className="flex-1">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row border border-gray-200 rounded-lg p-4 gap-4"
                    >
                      {/* Product Image */}
                      <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <h3 className="font-medium mb-1">{item.name}</h3>
                          <div className="font-semibold sm:text-right">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>

                        <div className="text-sm text-gray-600 mb-3">
                          {item.color && <span>{item.color}</span>}
                          {item.color && item.size && <span> • </span>}
                          {item.size && <span>Size {item.size}</span>}
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 py-1 border-x border-gray-300">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => confirmRemoveItem(item.id)}
                            className="text-gray-500 hover:text-red-500 transition-colors flex items-center"
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
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-4">Order Summary</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-2 mb-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center">
                    <ShoppingBag size={18} className="mr-2" />
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <ShoppingBag size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet</p>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
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
