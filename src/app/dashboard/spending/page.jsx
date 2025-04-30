"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts"
import { Calendar, Filter, DollarSign, ShoppingBag, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample data - replace with actual data from your backend
const monthlySpending = [
  { month: "Jan", amount: 2500 },
  { month: "Feb", amount: 3200 },
  { month: "Mar", amount: 2800 },
  { month: "Apr", amount: 3500 },
  { month: "May", amount: 4200 },
  { month: "Jun", amount: 3800 }
]

const categorySpending = [
  { name: "Feminine Hygiene", value: 45 },
  { name: "Personal Care", value: 25 },
  { name: "Health & Wellness", value: 20 },
  { name: "Others", value: 10 }
]

const recentPurchases = [
  {
    id: "ORD-7352",
    product: "Organic Cotton Pads",
    date: "2024-03-15",
    price: 19.99,
    category: "Feminine Hygiene"
  },
  {
    id: "ORD-7351",
    product: "Biodegradable Panty Liners",
    date: "2024-03-14",
    price: 9.99,
    category: "Feminine Hygiene"
  },
  {
    id: "ORD-7350",
    product: "Menstrual Cup",
    date: "2024-03-13",
    price: 29.99,
    category: "Personal Care"
  }
]

const COLORS = ["#ec4899", "#f472b6", "#fbcfe8", "#fce7f3"]

export default function SpendingAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7days")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showDatePicker, setShowDatePicker] = useState(false)

  const totalSpent = 8500
  const totalPurchases = 42
  const averageOrder = totalSpent / totalPurchases

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-pink-500 to-pink-700 text-transparent bg-clip-text">
        Spending Analytics
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="inline-flex items-center justify-center rounded-md border border-pink-200 dark:border-pink-800 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium shadow-sm hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
          >
            <Calendar className="mr-2 h-4 w-4 text-pink-600" />
            Time Range
            {showDatePicker && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-md bg-white dark:bg-gray-800 shadow-lg border border-pink-200 dark:border-pink-800 z-10">
                {["Today", "Last 7 days", "This month", "Custom range"].map((range) => (
                  <button
                    key={range}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-pink-50 dark:hover:bg-pink-900/20"
                    onClick={() => {
                      setTimeRange(range.toLowerCase().replace(/\s/g, ""))
                      setShowDatePicker(false)
                    }}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </button>
        </div>

        <select
          className="rounded-md border border-pink-200 dark:border-pink-800 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium shadow-sm hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="feminine">Feminine Hygiene</option>
          <option value="personal">Personal Care</option>
          <option value="health">Health & Wellness</option>
        </select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-700 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-pink-50 dark:bg-pink-900/20 group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30 transition-colors">
              <DollarSign className="h-8 w-8 text-pink-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="ml-4 group-hover:translate-x-1 transition-transform">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">₹{totalSpent.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-700 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-pink-50 dark:bg-pink-900/20 group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30 transition-colors">
              <ShoppingBag className="h-8 w-8 text-pink-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="ml-4 group-hover:translate-x-1 transition-transform">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Purchases</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalPurchases}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-700 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-pink-50 dark:bg-pink-900/20 group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30 transition-colors">
              <TrendingUp className="h-8 w-8 text-pink-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="ml-4 group-hover:translate-x-1 transition-transform">
              <p className="text-sm text-gray-500 dark:text-gray-400">Average Order</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">₹{averageOrder.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-700 hover:shadow-md transition-all duration-200">
          <h2 className="text-lg font-semibold mb-4">Monthly Spending</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySpending}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#ec4899" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-700 hover:shadow-md transition-all duration-200">
          <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySpending}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value}%)`}
                >
                  {categorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Purchases */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-pink-200 dark:hover:border-pink-700 hover:shadow-md transition-all duration-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Purchases</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-right py-3 px-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {recentPurchases.map((purchase) => (
                  <tr
                    key={purchase.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                  >
                    <td className="py-3 px-4">{purchase.product}</td>
                    <td className="py-3 px-4">{purchase.category}</td>
                    <td className="py-3 px-4">{purchase.date}</td>
                    <td className="py-3 px-4 text-right">₹{purchase.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}