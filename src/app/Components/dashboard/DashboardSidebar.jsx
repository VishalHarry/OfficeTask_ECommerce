"use client"

import { useState } from "react"
import {
  User,
  ShoppingBag,
  Heart,
  ShoppingCart,
  Truck,
  Settings,
  Bell,
  Award,
  LifeBuoy,
  LogOut,
  X,
  ChevronRight,
} from "lucide-react"

export default function DashboardSidebar({ activePage, setActivePage, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const menuItems = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "orders", label: "Order History", icon: ShoppingBag },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "cart", label: "My Cart", icon: ShoppingCart },
    { id: "shipping", label: "Shipping & Payment", icon: Truck },
    { id: "settings", label: "Account Settings", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "rewards", label: "Loyalty & Rewards", icon: Award },
    { id: "support", label: "Support Center", icon: LifeBuoy },
  ]

  const handleNavigation = (pageId) => {
    setActivePage(pageId)
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    // Handle logout logic here
    setIsLogoutModalOpen(false)
    // Redirect to login page or home page
    console.log("User logged out")
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Mobile close button */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={20} />
        </button>

        {/* User info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
              <span className="text-lg font-semibold">JD</span>
            </div>
            <div>
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-gray-500">john@example.com</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activePage === item.id ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    {activePage === item.id && <ChevronRight size={16} className="ml-auto" />}
                  </button>
                </li>
              )
            })}

            {/* Logout button */}
            <li className="pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Logout confirmation modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-2">Confirm Logout</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to logout from your account?</p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
