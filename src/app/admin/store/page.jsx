"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, FileText, BarChart2, ArrowRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function StoreControlPage() {
  const [isStoreOpen, setIsStoreOpen] = useState(true)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [storeAction, setStoreAction] = useState(null) 
  const [storeHours, setStoreHours] = useState({
    monday: { open: "09:00", close: "18:00", isOpen: true },
    tuesday: { open: "09:00", close: "18:00", isOpen: true },
    wednesday: { open: "09:00", close: "18:00", isOpen: true },
    thursday: { open: "09:00", close: "18:00", isOpen: true },
    friday: { open: "09:00", close: "18:00", isOpen: true },
    saturday: { open: "10:00", close: "16:00", isOpen: true },
    sunday: { open: "10:00", close: "16:00", isOpen: false },
  })

  // Store statistics
  const storeStats = {
    activeVisitors: 42,
    todayOrders: 18,
    pendingOrders: 7,
    todayRevenue: 3250,
  }

  // Add state for report modal
  const [showReportModal, setShowReportModal] = useState(false)

  // Update the store toggle function to be more interactive
  const handleToggleStore = (action) => {
    setStoreAction(action)
    setShowConfirmation(true)
  }

  const confirmStoreAction = () => {
    setIsStoreOpen(storeAction === "open")
    setShowConfirmation(false)

    // Show feedback toast or message
    const message =
      storeAction === "open"
        ? "Store is now open! Customers can place orders."
        : "Store is now closed. No new orders can be placed."

    // In a real app, you would show a toast notification
    console.log(message)
  }

  const handleHoursChange = (day, field, value) => {
    setStoreHours({
      ...storeHours,
      [day]: {
        ...storeHours[day],
        [field]: value,
      },
    })
  }

  const handleDayToggle = (day) => {
    setStoreHours({
      ...storeHours,
      [day]: {
        ...storeHours[day],
        isOpen: !storeHours[day].isOpen,
      },
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Store Control</h1>

      {/* Store Status Banner */}
      <div
        className={cn(
          "p-4 rounded-lg border",
          isStoreOpen
            ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
            : "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400",
        )}
      >
        <div className="flex items-center">
          <div className={cn("p-2 rounded-full mr-4", isStoreOpen ? "bg-green-500/20" : "bg-red-500/20")}>
            {isStoreOpen ? <CheckCircle className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
          </div>
          <div>
            <h2 className="text-lg font-semibold">Store is currently {isStoreOpen ? "Open" : "Closed"}</h2>
            <p className="text-sm opacity-80">
              {isStoreOpen
                ? "Your store is open and customers can place orders."
                : "Your store is closed. Customers cannot place new orders."}
            </p>
          </div>
        </div>
      </div>

      {/* Store Control Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-background border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Store Control Panel</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h3 className="text-lg font-medium mb-1">Store Status</h3>
                <p className="text-sm text-muted-foreground">Toggle your store&apos;s availability to customers</p>
              </div>
              <div className="flex items-center">
                <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-muted">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out",
                      isStoreOpen ? "translate-x-5 bg-primary" : "translate-x-0 bg-muted-foreground",
                    )}
                  />
                  <input
                    type="checkbox"
                    className="absolute opacity-0 h-0 w-0"
                    checked={isStoreOpen}
                    onChange={() => handleToggleStore(isStoreOpen ? "close" : "open")}
                  />
                </div>
                <span className="ml-3 text-sm font-medium">{isStoreOpen ? "Open" : "Closed"}</span>
              </div>
            </div>

            {/* Add View Detailed Report button */}
            <div className="mt-8 p-4 bg-muted/30 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-medium">Store Performance</h3>
                  <p className="text-sm text-muted-foreground">View detailed analytics and reports</p>
                </div>
                <button
                  onClick={() => setShowReportModal(true)}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  View Detailed Report
                </button>
              </div>
            </div>

            <div className="space-y-6 mt-8">
              <h3 className="text-lg font-medium">Store Hours</h3>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        Day
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        Open
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        Close
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {Object.entries(storeHours).map(([day, hours]) => (
                      <tr key={day} className="hover:bg-muted/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium capitalize">{day}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <input
                            type="time"
                            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
                            value={hours.open}
                            onChange={(e) => handleHoursChange(day, "open", e.target.value)}
                            disabled={!hours.isOpen}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <input
                            type="time"
                            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
                            value={hours.close}
                            onChange={(e) => handleHoursChange(day, "close", e.target.value)}
                            disabled={!hours.isOpen}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-muted">
                              <span
                                aria-hidden="true"
                                className={cn(
                                  "pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out",
                                  hours.isOpen ? "translate-x-5 bg-primary" : "translate-x-0 bg-muted-foreground",
                                )}
                              />
                              <input
                                type="checkbox"
                                className="absolute opacity-0 h-0 w-0"
                                checked={hours.isOpen}
                                onChange={() => handleDayToggle(day)}
                              />
                            </div>
                            <span className="ml-3 text-sm">{hours.isOpen ? "Open" : "Closed"}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Store Statistics</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active Visitors</span>
              <span className="font-semibold">{storeStats.activeVisitors}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Today&apos;s Orders</span>
              <span className="font-semibold">{storeStats.todayOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Pending Orders</span>
              <span className="font-semibold">{storeStats.pendingOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Today&apos;s Revenue</span>
              <span className="font-semibold">₹{storeStats.todayRevenue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">{storeAction === "open" ? "Open Store" : "Close Store"}</h3>
            <p className="mb-6">
              {storeAction === "open"
                ? "Are you sure you want to open the store? This will allow customers to place new orders."
                : "Are you sure you want to close the store? This will prevent customers from placing new orders."}
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 border border-input bg-background text-sm font-medium rounded-md shadow-sm hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={confirmStoreAction}
                className={cn(
                  "px-4 py-2 text-white text-sm font-medium rounded-md shadow-sm",
                  storeAction === "open" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700",
                )}
              >
                {storeAction === "open" ? "Open Store" : "Close Store"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold">Store Performance Report</h3>
              <button onClick={() => setShowReportModal(false)} className="p-1 rounded-full hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</h4>
                  <p className="text-2xl font-bold">₹325,800</p>
                  <div className="flex items-center mt-2 text-green-500 text-sm">
                    <ArrowRight className="h-3 w-3 mr-1 rotate-45" />
                    <span>12.5% vs. last month</span>
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Orders</h4>
                  <p className="text-2xl font-bold">1,243</p>
                  <div className="flex items-center mt-2 text-green-500 text-sm">
                    <ArrowRight className="h-3 w-3 mr-1 rotate-45" />
                    <span>8.2% vs. last month</span>
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Conversion Rate</h4>
                  <p className="text-2xl font-bold">3.2%</p>
                  <div className="flex items-center mt-2 text-red-500 text-sm">
                    <ArrowRight className="h-3 w-3 mr-1 -rotate-45" />
                    <span>0.5% vs. last month</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Monthly Sales Trend</h4>
                  <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                    <FileText className="h-12 w-12 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Chart would appear here in a real implementation</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Top Selling Products</h4>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs text-muted-foreground bg-muted/50">
                          <th className="font-medium text-left py-3 px-4">Product</th>
                          <th className="font-medium text-left py-3 px-4">Units Sold</th>
                          <th className="font-medium text-left py-3 px-4">Revenue</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr className="hover:bg-muted/50">
                          <td className="py-3 px-4 text-sm">Premium Wireless Headphones</td>
                          <td className="py-3 px-4 text-sm">50</td>
                          <td className="py-3 px-4 text-sm">₹12,500</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="py-3 px-4 text-sm">Smart Fitness Watch</td>
                          <td className="py-3 px-4 text-sm">42</td>
                          <td className="py-3 px-4 text-sm">₹9,800</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="py-3 px-4 text-sm">Leather Laptop Bag</td>
                          <td className="py-3 px-4 text-sm">38</td>
                          <td className="py-3 px-4 text-sm">₹7,600</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-6 border-t border-border">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 border border-input bg-background text-sm font-medium rounded-md shadow-sm hover:bg-muted"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
