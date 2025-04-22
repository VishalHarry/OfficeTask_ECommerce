"use client"

import { useState } from "react"
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
    <div className="flex min-h-screen bg-gray-50">
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
        <main className="flex-1 p-4 md:p-6 transition-all duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto">{pageComponents[activePage]}</div>
        </main>
      </div>
    </div>
  )
}
