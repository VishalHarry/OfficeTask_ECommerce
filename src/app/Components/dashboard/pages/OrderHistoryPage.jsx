"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, RefreshCw, Truck, Package, CheckCircle, Clock, ShoppingBag } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"

export default function OrderHistoryPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure theme is only accessed after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock order data
  const [orders, setOrders] = useState([
    {
      id: "ORD-10001",
      date: "May 10, 2023",
      total: 59.99,
      status: "Delivered",
      items: [
        { id: 1, name: "Organic Cotton Pads", price: 19.99, quantity: 2, image: "/api/placeholder/80/80" },
        { id: 2, name: "Biodegradable Panty Liners", price: 9.99, quantity: 2, image: "/api/placeholder/80/80" },
      ],
      shipping: {
        address: "456 Elm St, Los Angeles, CA 90001",
        method: "Standard Shipping",
        tracking: "TRK123456789",
      },
      payment: {
        method: "Credit Card",
        last4: "5678",
      },
    },
    {
      id: "ORD-10002",
      date: "April 22, 2023",
      total: 39.97,
      status: "Shipped",
      items: [
        { id: 3, name: "Reusable Menstrual Cup", price: 39.97, quantity: 1, image: "/api/placeholder/80/80" },
      ],
      shipping: {
        address: "789 Maple Ave, San Francisco, CA 94101",
        method: "Express Shipping",
        tracking: "TRK987654321",
      },
      payment: {
        method: "PayPal",
        email: "j***@example.com",
      },
    },
    {
      id: "ORD-10003",
      date: "March 15, 2023",
      total: 25.5,
      status: "Delivered",
      items: [
        { id: 4, name: "Herbal Sanitary Pads", price: 12.75, quantity: 2, image: "/api/placeholder/80/80" },
      ],
      shipping: {
        address: "123 Oak St, Chicago, IL 60601",
        method: "Standard Shipping",
        tracking: "TRK543216789",
      },
      payment: {
        method: "Credit Card",
        last4: "4321",
      },
    },
  ])

  const [expandedOrder, setExpandedOrder] = useState(null)

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
    } else {
      setExpandedOrder(orderId)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle size={16} className="text-green-500" />
      case "Shipped":
        return <Truck size={16} className="text-blue-500" />
      case "Processing":
        return <Package size={16} className="text-yellow-500" />
      default:
        return <Clock size={16} className="text-gray-500 dark:text-gray-400" />
    }
  }

  const handleReorder = (orderId) => {
    // Reorder logic would go here
    console.log(`Reordering items from order ${orderId}`)
  }


  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Your Orders</h2>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors duration-300">
                  {/* Order Summary Row */}
                  <div
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-2 md:mb-0">
                      <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white transition-colors duration-200">
                        {getStatusIcon(order.status)}
                        <span>{order.id}</span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm md:border-l md:border-gray-300 md:dark:border-gray-600 md:pl-4 transition-colors duration-200">{order.date}</div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm md:border-l md:border-gray-300 md:dark:border-gray-600 md:pl-4 transition-colors duration-200">
                        {order.items.length} {order.items.length === 1 ? "item" : "items"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 md:mt-0">
                      <div className="font-medium md:mr-8 text-gray-900 dark:text-white transition-colors duration-200">${order.total.toFixed(2)}</div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 transition-colors duration-200">
                        {expandedOrder === order.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {expandedOrder === order.id && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in transition-colors duration-300">
                      {/* Order Items */}
                      <div className="mb-6">
                        <h3 className="font-medium mb-3 text-gray-900 dark:text-white transition-colors duration-200">Items in this order</h3>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0 transition-colors duration-200">
                                <div className="relative w-full h-full">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                  />
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-white transition-colors duration-200">{item.name}</h4>
                                <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                                </div>
                              </div>
                              <div className="font-medium text-gray-900 dark:text-white transition-colors duration-200">${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Shipping Info */}
                        <div>
                          <h3 className="font-medium mb-2 text-gray-900 dark:text-white transition-colors duration-200">Shipping Information</h3>
                          <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                            <p className="mb-1">{order.shipping.address}</p>
                            <p className="mb-1">{order.shipping.method}</p>
                            {order.shipping.tracking && (
                              <p>
                                Tracking: <span className="text-primary">{order.shipping.tracking}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Payment Info */}
                        <div>
                          <h3 className="font-medium mb-2 text-gray-900 dark:text-white transition-colors duration-200">Payment Information</h3>
                          <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                            <p className="mb-1">{order.payment.method}</p>
                            {order.payment.last4 && <p>Card ending in {order.payment.last4}</p>}
                            {order.payment.email && <p>{order.payment.email}</p>}
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div>
                          <h3 className="font-medium mb-2 text-gray-900 dark:text-white transition-colors duration-200">Order Summary</h3>
                          <div className="text-sm">
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600 dark:text-gray-400 transition-colors duration-200">Subtotal:</span>
                              <span className="text-gray-900 dark:text-white transition-colors duration-200">${order.total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600 dark:text-gray-400 transition-colors duration-200">Shipping:</span>
                              <span className="text-gray-900 dark:text-white transition-colors duration-200">Free</span>
                            </div>
                            <div className="flex justify-between font-medium mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
                              <span className="text-gray-900 dark:text-white transition-colors duration-200">Total:</span>
                              <span className="text-gray-900 dark:text-white transition-colors duration-200">${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => handleReorder(order.id)}
                          className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200"
                        >
                          <RefreshCw size={16} className="mr-2" />
                          Reorder
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <ShoppingBag size={48} className="text-gray-300 dark:text-gray-600 transition-colors duration-200" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-200">You haven&apos;t placed any orders yet.</p>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200">
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}