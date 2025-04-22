"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, RefreshCw, Truck, Package, CheckCircle, Clock } from "lucide-react"

export default function OrderHistoryPage() {
  // Mock order data
  const [orders, setOrders] = useState([
    {
      id: "ORD-12345",
      date: "April 15, 2023",
      total: 129.99,
      status: "Delivered",
      items: [
        { id: 1, name: "Premium T-Shirt", price: 29.99, quantity: 2, image: "/placeholder.svg?height=80&width=80" },
        { id: 2, name: "Designer Jeans", price: 69.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
      ],
      shipping: {
        address: "123 Main St, New York, NY 10001",
        method: "Standard Shipping",
        tracking: "TRK123456789",
      },
      payment: {
        method: "Credit Card",
        last4: "4242",
      },
    },
    {
      id: "ORD-12344",
      date: "March 28, 2023",
      total: 89.97,
      status: "Shipped",
      items: [
        { id: 3, name: "Running Shoes", price: 89.97, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
      ],
      shipping: {
        address: "123 Main St, New York, NY 10001",
        method: "Express Shipping",
        tracking: "TRK987654321",
      },
      payment: {
        method: "PayPal",
        email: "j***@example.com",
      },
    },
    {
      id: "ORD-12343",
      date: "February 12, 2023",
      total: 45.5,
      status: "Delivered",
      items: [
        { id: 4, name: "Winter Scarf", price: 19.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
        { id: 5, name: "Beanie Hat", price: 12.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
        { id: 6, name: "Wool Socks", price: 12.52, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
      ],
      shipping: {
        address: "123 Main St, New York, NY 10001",
        method: "Standard Shipping",
        tracking: "TRK543216789",
      },
      payment: {
        method: "Credit Card",
        last4: "1234",
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
        return <Clock size={16} className="text-gray-500" />
    }
  }

  const handleReorder = (orderId) => {
    // Reorder logic would go here
    console.log(`Reordering items from order ${orderId}`)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Orders</h2>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Order Summary Row */}
                  <div
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-2 md:mb-0">
                      <div className="flex items-center gap-2 font-medium">
                        {getStatusIcon(order.status)}
                        <span>{order.id}</span>
                      </div>
                      <div className="text-gray-600 text-sm md:border-l md:border-gray-300 md:pl-4">{order.date}</div>
                      <div className="text-gray-600 text-sm md:border-l md:border-gray-300 md:pl-4">
                        {order.items.length} {order.items.length === 1 ? "item" : "items"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 md:mt-0">
                      <div className="font-medium md:mr-8">${order.total.toFixed(2)}</div>
                      <div className="flex items-center gap-1 text-gray-600">
                        {expandedOrder === order.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {expandedOrder === order.id && (
                    <div className="p-4 border-t border-gray-200 animate-fade-in">
                      {/* Order Items */}
                      <div className="mb-6">
                        <h3 className="font-medium mb-3">Items in this order</h3>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <div className="text-sm text-gray-600">
                                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                                </div>
                              </div>
                              <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Shipping Info */}
                        <div>
                          <h3 className="font-medium mb-2">Shipping Information</h3>
                          <div className="text-sm text-gray-600">
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
                          <h3 className="font-medium mb-2">Payment Information</h3>
                          <div className="text-sm text-gray-600">
                            <p className="mb-1">{order.payment.method}</p>
                            {order.payment.last4 && <p>Card ending in {order.payment.last4}</p>}
                            {order.payment.email && <p>{order.payment.email}</p>}
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div>
                          <h3 className="font-medium mb-2">Order Summary</h3>
                          <div className="text-sm">
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Subtotal:</span>
                              <span>${order.total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Shipping:</span>
                              <span>Free</span>
                            </div>
                            <div className="flex justify-between font-medium mt-2 pt-2 border-t border-gray-200">
                              <span>Total:</span>
                              <span>${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => handleReorder(order.id)}
                          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
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
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
