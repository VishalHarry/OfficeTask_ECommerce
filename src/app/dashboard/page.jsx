"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  ShoppingBag, 
  Heart, 
  Clock, 
  Gift, 
  ChevronRight,
  Package,
  TrendingUp
} from "lucide-react"

export default function DashboardPage() {
  const [recentOrders] = useState([
    {
      id: "ORD-7352",
      product: "Organic Cotton Pads",
      date: "2024-03-15",
      status: "Delivered",
      total: 19.99,
    },
    {
      id: "ORD-7351",
      product: "Biodegradable Panty Liners",
      date: "2024-03-14",
      status: "Processing",
      total: 9.99,
    },
  ])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-pink-500 to-pink-700 text-transparent bg-clip-text">
        Welcome Back!
      </h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/dashboard/orderHistory" 
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 
          hover:border-pink-200 dark:hover:border-pink-700 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-pink-50 dark:bg-pink-900/20 group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30 transition-colors">
              <Package className="h-8 w-8 text-pink-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="ml-4 group-hover:translate-x-1 transition-transform">
              <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">Active Orders</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">2</h3>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/wishList" 
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 
          hover:border-pink-200 dark:hover:border-pink-700 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-pink-50 dark:bg-pink-900/20 group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30 transition-colors">
              <Heart className="h-8 w-8 text-pink-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="ml-4 group-hover:translate-x-1 transition-transform">
              <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">Wishlist Items</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">5</h3>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/loyaltyRewardsPage" 
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 
          hover:border-pink-200 dark:hover:border-pink-700 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-pink-50 dark:bg-pink-900/20 group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30 transition-colors">
              <Gift className="h-8 w-8 text-pink-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="ml-4 group-hover:translate-x-1 transition-transform">
              <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">Reward Points</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">250</h3>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/spending" 
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 
          hover:border-pink-200 dark:hover:border-pink-700 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-pink-50 dark:bg-pink-900/20 group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30 transition-colors">
              <TrendingUp className="h-8 w-8 text-pink-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="ml-4 group-hover:translate-x-1 transition-transform">
              <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">Total Spent</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">₹299</h3>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden
        hover:border-pink-200 dark:hover:border-pink-700 hover:shadow-md transition-all duration-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
            <Link href="/dashboard/orderHistory" 
              className="text-sm text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 
              flex items-center hover:bg-pink-50 dark:hover:bg-pink-900/20 px-3 py-1 rounded-full transition-all">
              View All <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentOrders.map((order) => (
              <div key={order.id} 
                className="py-4 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors px-4 -mx-4 group cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="group-hover:translate-x-1 transition-transform">
                    <p className="font-medium text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">{order.product}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Order ID: {order.id}</p>
                  </div>
                  <div className="text-right group-hover:translate-x-1 transition-transform">
                    <p className="font-medium text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">₹{order.total}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{order.date}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
