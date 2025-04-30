"use client"

import { useState, useEffect } from "react"
import { Menu, Bell, Search, ShoppingCart, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function DashboardHeader({ setIsMobileMenuOpen, activePage }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Use useEffect to handle mounting state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Format the page title
  const formatPageTitle = (pageId) => {
    const titles = {
      profile: "My Profile",
      orders: "Order History",
      wishlist: "My Wishlist",
      cart: "Shopping Cart",
      shipping: "Shipping & Payment Methods",
      settings: "Account Settings",
      notifications: "Notifications",
      rewards: "Loyalty & Rewards",
      support: "Support Center",
    }

    return titles[pageId] || "Dashboard"
  }

  // Mock notifications
  const notifications = [
    { id: 1, text: "Your order #12345 has been shipped", time: "2 hours ago", isRead: false },
    { id: 2, text: "New collection is now available", time: "1 day ago", isRead: true },
    { id: 3, text: "Your payment was successful", time: "3 days ago", isRead: true },
  ]

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 transition-all duration-300">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Left side - Mobile menu button and page title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">{formatPageTitle(activePage)}</h1>
        </div>

        {/* Right side - Search, theme toggle, notifications, cart */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search - Hidden on mobile */}
          <div className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
            />
            <Search size={18} className="absolute left-3 text-gray-400 dark:text-gray-500" />
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-gray-300" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>
          )}

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors duration-200"
              aria-label={`${isNotificationsOpen ? 'Close' : 'Open'} notifications`}
            >
              <Bell size={20} className="text-gray-700 dark:text-gray-300 transition-colors duration-200" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 transition-colors duration-200">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-medium text-gray-900 dark:text-white transition-colors duration-200">Notifications</h3>
                  <button className="text-sm text-primary hover:underline">Mark all as read</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <ul>
                      {notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className={`p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${!notification.isRead ? "bg-blue-50 dark:bg-blue-900/20" : ""
                            } transition-colors duration-200`}
                        >
                          <p className="text-sm text-gray-800 dark:text-gray-200 transition-colors duration-200">{notification.text}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">{notification.time}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="p-4 text-center text-gray-500 dark:text-gray-400 transition-colors duration-200">No notifications</p>
                  )}
                </div>
                <div className="p-2 text-center border-t border-gray-200 dark:border-gray-700">
                  <button className="text-sm text-primary hover:underline">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* Cart button */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors duration-200"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={20} className="text-gray-700 dark:text-gray-300 transition-colors duration-200" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}