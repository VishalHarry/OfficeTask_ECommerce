"use client"

import { useState } from "react"
import { Menu, Bell, Search, ShoppingCart } from "lucide-react"

export default function DashboardHeader({ setIsMobileMenuOpen, activePage }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Left side - Mobile menu button and page title */}
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-gray-500 hover:text-gray-700">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold">{formatPageTitle(activePage)}</h1>
        </div>

        {/* Right side - Search, notifications, cart */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search - Hidden on mobile */}
          <div className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <Search size={18} className="absolute left-3 text-gray-400" />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-medium">Notifications</h3>
                  <button className="text-sm text-primary hover:underline">Mark all as read</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <ul>
                      {notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${
                            !notification.isRead ? "bg-blue-50" : ""
                          }`}
                        >
                          <p className="text-sm">{notification.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="p-4 text-center text-gray-500">No notifications</p>
                  )}
                </div>
                <div className="p-2 text-center border-t border-gray-200">
                  <button className="text-sm text-primary hover:underline">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* Cart button */}
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <ShoppingCart size={20} />
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
