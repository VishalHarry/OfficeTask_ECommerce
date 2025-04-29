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
        <div className="bg-background border border-pink-100 dark:border-pink-800 rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-pink-600/70 dark:text-pink-300/70">Total Sales Today</p>
              <h3 className="text-2xl font-bold mt-1 text-pink-950 dark:text-pink-50">₹12,500</h3>
            </div>
            <div className="p-2 bg-pink-500/10 rounded-full">
              <DollarSign className="h-5 w-5 text-pink-500" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center text-green-500 text-sm">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>12.5%</span>
            </div>
            <span className="text-xs text-pink-600/70 dark:text-pink-300/70 ml-2">vs. yesterday</span>
          </div>
        </div>

        <div className="bg-background border border-pink-100 dark:border-pink-800 rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-pink-600/70 dark:text-pink-300/70">Weekly Revenue</p>
              <h3 className="text-2xl font-bold mt-1 text-pink-950 dark:text-pink-50">₹78,350</h3>
            </div>
            <div className="p-2 bg-pink-500/10 rounded-full">
              <ShoppingBag className="h-5 w-5 text-pink-500" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center text-green-500 text-sm">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>8.2%</span>
            </div>
            <span className="text-xs text-pink-600/70 dark:text-pink-300/70 ml-2">vs. last week</span>
          </div>
        </div>

        <div className="bg-background border border-pink-100 dark:border-pink-800 rounded-lg p-5 shadow-sm sm:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-pink-600/70 dark:text-pink-300/70">Monthly Revenue</p>
              <h3 className="text-2xl font-bold mt-1 text-pink-950 dark:text-pink-50">₹325,800</h3>
            </div>
            <div className="p-2 bg-pink-500/10 rounded-full">
              <Users className="h-5 w-5 text-pink-500" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center text-red-500 text-sm">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>3.1%</span>
            </div>
            <span className="text-xs text-pink-600/70 dark:text-pink-300/70 ml-2">vs. last month</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-background border border-pink-100 dark:border-pink-800 rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-pink-950 dark:text-pink-50">Sales Overview</h2>
            <div className="flex border border-pink-100 dark:border-pink-800 rounded-lg overflow-hidden">
              <button
                className={cn(
                  "px-3 py-1 text-sm",
                  activeChart === "weekly"
                    ? "bg-pink-600 text-white"
                    : "hover:bg-pink-50 dark:hover:bg-pink-900/20",
                )}
                onClick={() => setActiveChart("weekly")}
              >
                Weekly
              </button>
              <button
                className={cn(
                  "px-3 py-1 text-sm",
                  activeChart === "monthly"
                    ? "bg-pink-600 text-white"
                    : "hover:bg-pink-50 dark:hover:bg-pink-900/20",
                )}
                onClick={() => setActiveChart("monthly")}
              >
                Monthly
              </button>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line type="monotone" dataKey="sales" stroke="#ec4899" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Chart */}
        <div className="bg-background border border-pink-100 dark:border-pink-800 rounded-lg p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-pink-950 dark:text-pink-50">Sales by Category</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="value" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Best Selling Products & Recent Orders
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
      </div> */}

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
