"use client"

import { useState } from "react"
import { Search, Download, Eye, MoreHorizontal, FileText, Printer, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample orders data
const initialOrders = [
  {
    id: "ORD-7352",
    customer: {
      name: "Emma Johnson",
      email: "emma@example.com",
      phone: "+91 98765 43210",
    },
    date: "2023-06-15",
    status: "completed",
    total: 249.99,
    items: [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 249.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: "123 Main St, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400001",
      country: "India",
    },
    payment: {
      method: "Credit Card",
      cardLast4: "4242",
    },
  },
  {
    id: "ORD-7351",
    customer: {
      name: "Liam Smith",
      email: "liam@example.com",
      phone: "+91 87654 32109",
    },
    date: "2023-06-15",
    status: "processing",
    total: 199.99,
    items: [
      {
        id: 2,
        name: "Smart Fitness Watch",
        price: 199.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: "456 Park Avenue",
      city: "Delhi",
      state: "Delhi",
      zip: "110001",
      country: "India",
    },
    payment: {
      method: "PayPal",
      email: "liam@example.com",
    },
  },
  {
    id: "ORD-7350",
    customer: {
      name: "Olivia Brown",
      email: "olivia@example.com",
      phone: "+91 76543 21098",
    },
    date: "2023-06-14",
    status: "completed",
    total: 89.99,
    items: [
      {
        id: 3,
        name: "Leather Laptop Bag",
        price: 89.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: "789 Oak Street",
      city: "Bangalore",
      state: "Karnataka",
      zip: "560001",
      country: "India",
    },
    payment: {
      method: "Credit Card",
      cardLast4: "1234",
    },
  },
  {
    id: "ORD-7349",
    customer: {
      name: "Noah Wilson",
      email: "noah@example.com",
      phone: "+91 65432 10987",
    },
    date: "2023-06-14",
    status: "shipped",
    total: 79.99,
    items: [
      {
        id: 4,
        name: "Portable Bluetooth Speaker",
        price: 79.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: "101 Pine Road",
      city: "Chennai",
      state: "Tamil Nadu",
      zip: "600001",
      country: "India",
    },
    payment: {
      method: "UPI",
      id: "noah@upi",
    },
  },
  {
    id: "ORD-7348",
    customer: {
      name: "Sophia Davis",
      email: "sophia@example.com",
      phone: "+91 54321 09876",
    },
    date: "2023-06-13",
    status: "completed",
    total: 59.99,
    items: [
      {
        id: 5,
        name: "Minimalist Desk Lamp",
        price: 59.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: "202 Maple Avenue",
      city: "Hyderabad",
      state: "Telangana",
      zip: "500001",
      country: "India",
    },
    payment: {
      method: "Credit Card",
      cardLast4: "5678",
    },
  },
  {
    id: "ORD-7347",
    customer: {
      name: "James Miller",
      email: "james@example.com",
      phone: "+91 43210 98765",
    },
    date: "2023-06-13",
    status: "cancelled",
    total: 149.98,
    items: [
      {
        id: 6,
        name: "Organic Cotton T-Shirt",
        price: 29.99,
        quantity: 2,
      },
      {
        id: 7,
        name: "Stainless Steel Water Bottle",
        price: 24.99,
        quantity: 1,
      },
      {
        id: 8,
        name: "Wireless Charging Pad",
        price: 39.99,
        quantity: 1,
      },
      {
        id: 10,
        name: "Ceramic Coffee Mug Set",
        price: 34.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: "303 Cedar Street",
      city: "Kolkata",
      state: "West Bengal",
      zip: "700001",
      country: "India",
    },
    payment: {
      method: "Net Banking",
      bank: "HDFC Bank",
    },
  },
  {
    id: "ORD-7346",
    customer: {
      name: "Isabella Garcia",
      email: "isabella@example.com",
      phone: "+91 32109 87654",
    },
    date: "2023-06-12",
    status: "processing",
    total: 199.99,
    items: [
      {
        id: 9,
        name: "Ergonomic Office Chair",
        price: 199.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: "404 Birch Lane",
      city: "Pune",
      state: "Maharashtra",
      zip: "411001",
      country: "India",
    },
    payment: {
      method: "Credit Card",
      cardLast4: "9012",
    },
  },
  {
    id: "ORD-7345",
    customer: {
      name: "Ethan Martinez",
      email: "ethan@example.com",
      phone: "+91 21098 76543",
    },
    date: "2023-06-12",
    status: "shipped",
    total: 34.99,
    items: [
      {
        id: 10,
        name: "Ceramic Coffee Mug Set",
        price: 34.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: "505 Walnut Drive",
      city: "Ahmedabad",
      state: "Gujarat",
      zip: "380001",
      country: "India",
    },
    payment: {
      method: "UPI",
      id: "ethan@upi",
    },
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  const handleDownloadInvoice = (orderId) => {
    // In a real app, this would generate and download a PDF invoice
    console.log(`Downloading invoice for order ${orderId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Orders & Sales History</h1>
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
          <Download className="mr-2 h-4 w-4" />
          Export Orders
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search orders by ID or customer name..."
            className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-background border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-muted-foreground bg-muted/50">
                <th className="font-medium text-left py-3 px-4">Order ID</th>
                <th className="font-medium text-left py-3 px-4">Customer</th>
                <th className="font-medium text-left py-3 px-4">Date</th>
                <th className="font-medium text-left py-3 px-4">Status</th>
                <th className="font-medium text-left py-3 px-4">Total</th>
                <th className="font-medium text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium">{order.customer.name}</p>
                      <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{order.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                        order.status === "completed" &&
                          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                        order.status === "processing" &&
                          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
                        order.status === "shipped" &&
                          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                        order.status === "cancelled" && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                      )}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">₹{order.total.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadInvoice(order.id)}
                        className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                        title="Download Invoice"
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                      <div className="relative group">
                        <button className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-border hidden group-hover:block z-10">
                          <div className="py-1" role="menu" aria-orientation="vertical">
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-muted" role="menuitem">
                              Mark as Shipped
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-muted" role="menuitem">
                              Mark as Completed
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-muted text-red-600"
                              role="menuitem"
                            >
                              Cancel Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="py-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No orders found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredOrders.length}</span> of{" "}
          <span className="font-medium">{orders.length}</span> orders
        </p>
        <div className="flex items-center space-x-2">
          <button
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-muted disabled:opacity-50"
            disabled
          >
            Previous
          </button>
          <button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
            1
          </button>
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-muted">
            2
          </button>
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-muted">
            Next
          </button>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold">Order Details - {selectedOrder.id}</h3>
              <button onClick={() => setShowOrderDetails(false)} className="p-1 rounded-full hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Customer Information</h4>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="font-medium">{selectedOrder.customer.name}</p>
                    <p className="text-sm">{selectedOrder.customer.email}</p>
                    <p className="text-sm">{selectedOrder.customer.phone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Shipping Address</h4>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm">{selectedOrder.shipping.address}</p>
                    <p className="text-sm">
                      {selectedOrder.shipping.city}, {selectedOrder.shipping.state} {selectedOrder.shipping.zip}
                    </p>
                    <p className="text-sm">{selectedOrder.shipping.country}</p>
                  </div>
                </div>
              </div>

              <h4 className="text-sm font-medium text-muted-foreground mb-2">Order Items</h4>
              <div className="border border-border rounded-lg overflow-hidden mb-6">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-muted-foreground bg-muted/50">
                      <th className="font-medium text-left py-2 px-4">Product</th>
                      <th className="font-medium text-left py-2 px-4">Price</th>
                      <th className="font-medium text-left py-2 px-4">Quantity</th>
                      <th className="font-medium text-left py-2 px-4">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {selectedOrder.items.map((item) => (
                      <tr key={item.id}>
                        <td className="py-3 px-4 text-sm">{item.name}</td>
                        <td className="py-3 px-4 text-sm">₹{item.price.toFixed(2)}</td>
                        <td className="py-3 px-4 text-sm">{item.quantity}</td>
                        <td className="py-3 px-4 text-sm font-medium">₹{(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-muted/30">
                    <tr>
                      <td colSpan="3" className="py-3 px-4 text-sm font-medium text-right">
                        Total:
                      </td>
                      <td className="py-3 px-4 text-sm font-bold">₹{selectedOrder.total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Payment Information</h4>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm">
                      <span className="font-medium">Method:</span> {selectedOrder.payment.method}
                    </p>
                    {selectedOrder.payment.cardLast4 && (
                      <p className="text-sm">
                        <span className="font-medium">Card:</span> •••• {selectedOrder.payment.cardLast4}
                      </p>
                    )}
                    {selectedOrder.payment.email && (
                      <p className="text-sm">
                        <span className="font-medium">Email:</span> {selectedOrder.payment.email}
                      </p>
                    )}
                    {selectedOrder.payment.id && (
                      <p className="text-sm">
                        <span className="font-medium">ID:</span> {selectedOrder.payment.id}
                      </p>
                    )}
                    {selectedOrder.payment.bank && (
                      <p className="text-sm">
                        <span className="font-medium">Bank:</span> {selectedOrder.payment.bank}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Order Status</h4>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                          selectedOrder.status === "completed" &&
                            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                          selectedOrder.status === "processing" &&
                            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
                          selectedOrder.status === "shipped" &&
                            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                          selectedOrder.status === "cancelled" &&
                            "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                        )}
                      >
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Order Date:</span> {selectedOrder.date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-border">
                <button
                  onClick={() => handleDownloadInvoice(selectedOrder.id)}
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-muted"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Download Invoice
                </button>
                <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-muted">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
