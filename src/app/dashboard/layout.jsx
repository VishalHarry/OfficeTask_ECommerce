"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  User,
  ShoppingCart,
  Heart,
  Clock,
  Settings,
  Bell,
  CreditCard,
  Gift,
  MessageSquare,
  Truck,
} from "lucide-react"

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: User },
    { name: "MyProfile", href: "/dashboard/myprofile", icon: User },
    { name: "Orders History", href: "/dashboard/orderHistory", icon: Clock },
    { name: "Cart", href: "/dashboard/cart", icon: ShoppingCart },
    { name: "Wishlist", href: "/dashboard/wishList", icon: Heart },
    // { name: "Address", href: "/dashboard/shipping", icon: Truck },
    { name: "Spending", href: "/dashboard/spending", icon: CreditCard },

    { name: "Notifications", href: "/dashboard/notification", icon: Bell },
    { name: "Support", href: "/dashboard/support", icon: MessageSquare },
  
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar - Made static with fixed positioning */}
        <aside className="hidden md:block fixed left-0 h-screen w-64">
          <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-pink-700 text-transparent bg-clip-text">My Account</h2>
            </div>
            <nav className="flex-1 px-2 pb-4 space-y-1 mt-4 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:bg-pink-50/50 dark:hover:bg-pink-900/10"
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 transition-colors ${isActive ? "text-pink-600 dark:text-pink-400" : ""}`} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content - Adjusted with margin to account for fixed sidebar */}
        <main className="flex-1 ml-64">
          <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
