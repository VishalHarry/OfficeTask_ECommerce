"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"
import ProfilePage from "./pages/ProfilePage"
import OrderHistoryPage from "./pages/OrderHistoryPage"
import WishlistPage from "./pages/WishlistPage"
import CartPage from "./pages/CartPage"
import ShippingPaymentPage from "./pages/ShippingPaymentPage"
import AccountSettingsPage from "./pages/AccountSettingsPage"
import NotificationsPage from "./pages/NotificationsPage"
import LoyaltyRewardsPage from "./pages/LoyaltyRewardsPage"
import SupportCenterPage from "./pages/SupportCenterPage"
import DashboardSidebar from "./DashboardSidebar"
import DashboardHeader from "./DashboardHeader"

export default function DashboardLayout() {
  const [activePage, setActivePage] = useState("profile")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle mounting state for theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Map of page components
  const pageComponents = {
    profile: <ProfilePage />,
    orders: <OrderHistoryPage />,
    wishlist: <WishlistPage />,
    cart: <CartPage />,
    shipping: <ShippingPaymentPage />,
    settings: <AccountSettingsPage />,
    notifications: <NotificationsPage />,
    rewards: <LoyaltyRewardsPage />,
    support: <SupportCenterPage />,
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Sidebar - hidden on mobile, shown on larger screens */}
        <DashboardSidebar
          activePage={activePage}
          setActivePage={setActivePage}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          <DashboardHeader setIsMobileMenuOpen={setIsMobileMenuOpen} activePage={activePage} />

          {/* Page content with transition */}
          <main className="flex-1 p-4 md:p-6 transition-all duration-300 ease-in-out bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">{mounted ? pageComponents[activePage] : null}</div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}