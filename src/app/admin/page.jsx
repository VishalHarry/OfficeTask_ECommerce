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
  Clock,
  TrendingUp
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
  { name: "Feminine Hygiene", value: 40 },
  { name: "Electronics", value: 30 },
  { name: "Clothing", value: 20 },
  { name: "Home", value: 10 },
]

// Sample data for best selling products
const bestSellingProducts = [
  {
    id: 1,
    name: "Organic Cotton Pads",
    image: "https://imgs.search.brave.com/tHQDwZGTAKUve7PXALUXEhIg0bgzEKpXu4cjQzHu4XE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z2V0cmFlbC5jb20v/Y2RuL3Nob3AvZmls/ZXMvT1JHQU5JQ19D/T1RUT05fQ09WRVJf/UEFEU19SQUVMLVJH/LTAyX0RUQ19SRUdV/TEFSXzI4X0NPVU5U/X1BPTFlfRlJPTlRf/N2E3OTUyOTQtMjJi/NS00NGQzLTk4ZjMt/NGE4NzA4OGQ0OGY4/LndlYnA_dj0xNzM4/Nzk5OTU4JndpZHRo/PTIwNDg",
    revenue: 15000,
    sold: 60,
  },
  {
    id: 2,
    name: "Biodegradable Panty Liners",
    image: "https://imgs.search.brave.com/L_ia0_fNVDGp5wnmI5ZsHCoRw9WWI8Pdtyb-2ZTAP6Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/am9zYXBhZHMuY29t/L2Nkbi9zaG9wL2Zp/bGVzLzE4LTEud2Vi/cD92PTE2ODcxNjUw/Njkmd2lkdGg9MTk0/Ng",
    revenue: 12000,
    sold: 50,
  },
  {
    id: 3,
    name: "Reusable Menstrual Cup",
    image: "https://imgs.search.brave.com/JX6rN-LubYiO0uGMOLVYKIVA6X1Cm7wuaK21lCu_4EM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vRmxl/eC1SZXVzYWJsZS1N/ZW5zdHJ1YWwtRGlz/Yy0xLUNvdW50LUNh/cGFjaXR5LTcwbUxf/NGYwY2Q0YTktMWEx/NS00NWQ0LTk5ZGYt/NWM2NGQ3NjhjNWM3/LjY5NWZkMzIwMDEz/MTk0MWFkOTMxMGY2/N2ZjMzllNGViLmpw/ZWc_b2RuSGVpZ2h0/PTU4MCZvZG5XaWR0/aD01ODAmb2RuQmc9/RkZGRkZG",
    revenue: 10000,
    sold: 40,
  },
  {
    id: 4,
    name: "Herbal Sanitary Pads",
    image: "https://imgs.search.brave.com/rShkZZf5TAhn0eyrvCpKt8Ojr7sBs3tWjIdBFZ8Z02E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFLUE02VW92Z0wu/anBn",
    revenue: 8000,
    sold: 35,
  },
  {
    id: 5,
    name: "Eco-Friendly Tampons",
    image: "https://imgs.search.brave.com/Rz6xxo73PFUlsXovmtcuSnt5IqU4KKCIiYVX9i21JYU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90YXJn/ZXQuc2NlbmU3LmNv/bS9pcy9pbWFnZS9U/YXJnZXQvR1VFU1Rf/ZWY5YmYxY2MtYjQ0/My00YzllLTlkNWQt/OGRhODZkYWYzMDg1/P3dpZD04MDAmaGVp/PTgwMCZxbHQ9ODAm/Zm10PXBqcGVn",
    revenue: 7000,
    sold: 30,
  },
]

// Sample data for recent orders
const recentOrders = [
  {
    id: "ORD-7352",
    user: "Emma Johnson",
    product: "Organic Cotton Pads",
    date: "2023-06-15",
    status: "completed",
    total: 19.99,
  },
  {
    id: "ORD-7351",
    user: "Liam Smith",
    product: "Biodegradable Panty Liners",
    date: "2023-06-15",
    status: "processing",
    total: 9.99,
  },
  {
    id: "ORD-7350",
    user: "Olivia Brown",
    product: "Reusable Menstrual Cup",
    date: "2023-06-14",
    status: "completed",
    total: 39.97,
  },
  {
    id: "ORD-7349",
    user: "Noah Wilson",
    product: "Herbal Sanitary Pads",
    date: "2023-06-14",
    status: "shipped",
    total: 12.75,
  },
  {
    id: "ORD-7348",
    user: "Sophia Davis",
    product: "Eco-Friendly Tampons",
    date: "2023-06-13",
    status: "completed",
    total: 14.99,
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
  const [timeRange, setTimeRange] = useState("7days")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-pink-950 dark:text-pink-50">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <select 
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">This year</option>
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

      {/* Best Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-pink-100 dark:border-pink-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-pink-950 dark:text-pink-50">Top Selling Products</h2>
            <button className="text-pink-600 hover:text-pink-700 text-sm flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {bestSellingProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-pink-50/50 dark:bg-pink-900/20 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-pink-950 dark:text-pink-50">{product.name}</h3>
                    <p className="text-sm text-pink-600/70 dark:text-pink-300/70">{product.sold} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-pink-950 dark:text-pink-50">₹{product.revenue.toLocaleString()}</p>
                  <div className="flex items-center text-green-500 text-sm">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>12.5%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-pink-100 dark:border-pink-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-pink-950 dark:text-pink-50">Recent Orders</h2>
            <button className="text-pink-600 hover:text-pink-700 text-sm flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-pink-50/50 dark:bg-pink-900/20 rounded-lg">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-pink-950 dark:text-pink-50">{order.user}</h3>
                    <span className="text-sm text-pink-600/70 dark:text-pink-300/70">#{order.id}</span>
                  </div>
                  <p className="text-sm text-pink-600/70 dark:text-pink-300/70">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-pink-950 dark:text-pink-50">₹{order.total}</p>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    order.status === "completed" && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
                    order.status === "processing" && "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
                    order.status === "shipped" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                  )}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-pink-100 dark:border-pink-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-pink-950 dark:text-pink-50">Low Stock Alerts</h2>
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900/20 dark:text-red-400">
            {productStats.lowStock} Products
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(productStats.lowStock)].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-pink-50/50 dark:bg-pink-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-pink-950 dark:text-pink-50">Product {index + 1}</h3>
                  <p className="text-sm text-pink-600/70 dark:text-pink-300/70">5 units left</p>
                </div>
              </div>
              <button className="text-pink-600 hover:text-pink-700">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
