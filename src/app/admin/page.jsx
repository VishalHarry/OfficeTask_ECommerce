"use client"

import { useState } from "react"
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  AlertTriangle,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Sample data for charts
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
  { name: "Jul", sales: 7000 },
]

const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Home", value: 20 },
  { name: "Beauty", value: 15 },
  { name: "Other", value: 5 },
]

// Sample data for best selling products
const bestSellingProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    image: "/placeholder.svg?height=80&width=80",
    revenue: 12500,
    sold: 50,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    image: "/placeholder.svg?height=80&width=80",
    revenue: 9800,
    sold: 42,
  },
  {
    id: 3,
    name: "Leather Laptop Bag",
    image: "/placeholder.svg?height=80&width=80",
    revenue: 7600,
    sold: 38,
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    image: "/placeholder.svg?height=80&width=80",
    revenue: 6200,
    sold: 31,
  },
  {
    id: 5,
    name: "Minimalist Desk Lamp",
    image: "/placeholder.svg?height=80&width=80",
    revenue: 5400,
    sold: 27,
  },
]

// Sample data for recent orders
const recentOrders = [
  {
    id: "ORD-7352",
    user: "Emma Johnson",
    product: "Premium Wireless Headphones",
    date: "2023-06-15",
    status: "completed",
    total: 249.99,
  },
  {
    id: "ORD-7351",
    user: "Liam Smith",
    product: "Smart Fitness Watch",
    date: "2023-06-15",
    status: "processing",
    total: 199.99,
  },
  {
    id: "ORD-7350",
    user: "Olivia Brown",
    product: "Leather Laptop Bag",
    date: "2023-06-14",
    status: "completed",
    total: 89.99,
  },
  {
    id: "ORD-7349",
    user: "Noah Wilson",
    product: "Portable Bluetooth Speaker",
    date: "2023-06-14",
    status: "shipped",
    total: 79.99,
  },
  {
    id: "ORD-7348",
    user: "Sophia Davis",
    product: "Minimalist Desk Lamp",
    date: "2023-06-13",
    status: "completed",
    total: 59.99,
  },
]

// Sample data for product stats
const productStats = {
  inStock: 142,
  outOfStock: 8,
  lowStock: 15,
}

export default function AdminDashboard() {
  const [activeChart, setActiveChart] = useState("weekly")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      {/* Sales Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Total Sales Today</p>
              <h3 className="text-2xl font-bold mt-1">₹12,500</h3>
            </div>
            <div className="p-2 bg-green-500/10 rounded-full">
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center text-green-500 text-sm">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>12.5%</span>
            </div>
            <span className="text-xs text-muted-foreground ml-2">vs. yesterday</span>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Weekly Revenue</p>
              <h3 className="text-2xl font-bold mt-1">₹78,350</h3>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-full">
              <ShoppingBag className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center text-green-500 text-sm">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>8.2%</span>
            </div>
            <span className="text-xs text-muted-foreground ml-2">vs. last week</span>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-5 shadow-sm sm:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              <h3 className="text-2xl font-bold mt-1">₹325,800</h3>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-full">
              <Users className="h-5 w-5 text-purple-500" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center text-red-500 text-sm">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>3.1%</span>
            </div>
            <span className="text-xs text-muted-foreground ml-2">vs. last month</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-background border border-border rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Sales Analytics</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveChart("weekly")}
                className={cn(
                  "px-3 py-1 text-sm rounded-md",
                  activeChart === "weekly"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                Weekly
              </button>
              <button
                onClick={() => setActiveChart("monthly")}
                className={cn(
                  "px-3 py-1 text-sm rounded-md",
                  activeChart === "monthly"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                Monthly
              </button>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    borderRadius: "0.5rem",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                  }}
                  formatter={(value) => [`₹${value}`, "Sales"]}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
          <h3 className="font-semibold mb-6">Sales by Category</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    borderRadius: "0.5rem",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                  }}
                  formatter={(value) => [`${value}%`, "Percentage"]}
                />
                <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Best Selling Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-background border border-border rounded-lg shadow-sm">
          <div className="p-5 border-b border-border">
            <h3 className="font-semibold">Best Selling Products</h3>
          </div>
          <div className="divide-y divide-border">
            {bestSellingProducts.map((product) => (
              <div key={product.id} className="p-4 flex items-center">
                <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <div className="w-full h-full relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{product.sold} sold</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{product.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <button className="text-sm text-primary flex items-center justify-center w-full">
              View All Products
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-background border border-border rounded-lg shadow-sm">
          <div className="p-5 border-b border-border flex justify-between items-center">
            <h3 className="font-semibold">Recent Orders</h3>
            <button className="text-sm text-primary">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-muted-foreground bg-muted/50">
                  <th className="font-medium text-left py-3 px-4">Order ID</th>
                  <th className="font-medium text-left py-3 px-4">Customer</th>
                  <th className="font-medium text-left py-3 px-4">Product</th>
                  <th className="font-medium text-left py-3 px-4">Date</th>
                  <th className="font-medium text-left py-3 px-4">Status</th>
                  <th className="font-medium text-left py-3 px-4">Total</th>
                  <th className="font-medium text-left py-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-sm">{order.id}</td>
                    <td className="py-3 px-4 text-sm">{order.user}</td>
                    <td className="py-3 px-4 text-sm max-w-[200px] truncate">{order.product}</td>
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
                        )}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">In Stock Products</p>
              <h3 className="text-2xl font-bold mt-1">{productStats.inStock}</h3>
            </div>
            <div className="p-2 bg-green-500/10 rounded-full">
              <Package className="h-5 w-5 text-green-500" />
            </div>
          </div>
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{
                width: `${(productStats.inStock / (productStats.inStock + productStats.outOfStock + productStats.lowStock)) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Out of Stock Products</p>
              <h3 className="text-2xl font-bold mt-1">{productStats.outOfStock}</h3>
            </div>
            <div className="p-2 bg-red-500/10 rounded-full">
              <Package className="h-5 w-5 text-red-500" />
            </div>
          </div>
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500"
              style={{
                width: `${(productStats.outOfStock / (productStats.inStock + productStats.outOfStock + productStats.lowStock)) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Low Stock Products</p>
              <h3 className="text-2xl font-bold mt-1">{productStats.lowStock}</h3>
            </div>
            <div className="p-2 bg-yellow-500/10 rounded-full">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
          </div>
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-500"
              style={{
                width: `${(productStats.lowStock / (productStats.inStock + productStats.outOfStock + productStats.lowStock)) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
