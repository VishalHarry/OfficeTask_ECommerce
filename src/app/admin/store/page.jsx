"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function StoreControlPage() {
  const [isStoreOpen, setIsStoreOpen] = useState(true)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [storeAction, setStoreAction] = useState(null) // 'open' or 'close'
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

  const handleToggleStore = (action) => {
    setStoreAction(action)
    setShowConfirmation(true)
  }

  const confirmStoreAction = () => {
    setIsStoreOpen(storeAction === 'open')
    setShowConfirmation(false)
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
      <div className={cn(
        "p-4 rounded-lg border",
        isStoreOpen 
          ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400" 
          : "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
      )}>
        <div className="flex items-center">
          <div className={cn(
            "p-2 rounded-full mr-4",
            isStoreOpen ? "bg-green-500/20" : "bg-red-500/20"
          )}>
            {isStoreOpen ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <AlertTriangle className="h-6 w-6" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              Store is currently {isStoreOpen ? "Open" : "Closed"}
            </h2>
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
                <p className="text-sm text-muted-foreground">
                  Toggle your store's availability to customers
                </p>
              </div>
              <div className="flex items-center">
                <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-muted">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out",
                      isStoreOpen 
                        ? "translate-x-5 bg-primary" 
                        : "translate-x-0 bg-muted-foreground"
                    )}
                  />
                  <input
                    type="checkbox"
                    className="absolute opacity-0 h-0 w-0"
                    checked={isStoreOpen}
                    onChange={() => handleToggleStore(isStoreOpen ? 'close' : 'open')}
                  />
                </div>
                <span className="ml-3 text-sm font-medium">
                  {isStoreOpen ? "Open" : "Closed"}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium">Store Hours</h3>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Day
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Open
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Close
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {Object.entries(storeHours).map(([day, hours]) => (
                      <tr key={day} className="hover:bg-muted/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium capitalize">
                          {day}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <input
                            type="time"
                            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
                            value={hours.open}
                            onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                            disabled={!hours.isOpen}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <input
                            type="time"
                            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
                            value={hours.close}
                            onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
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
                                  hours.isOpen 
                                    ? "translate-x-5 bg-primary" 
                                    : "translate-x-0 bg-muted-foreground"
                                )}
                              />
                              <input
                                type="checkbox"
                                className="absolute opacity-0 h-0 w-0"
                                checked={hours.isOpen}
                                onChange={() => handleDayToggle(day)}
                              />
                            </div>
                            <span className="ml-3 text-sm">
                              {hours.isOpen ? "Open" : "Closed"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <button 
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  onClick={() => alert("Store hours updated!")}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Store Stats Card */}
        <div className="bg-background border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Store Statistics</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Active Visitors</h3>
                <p className="text-2xl font-bold">{storeStats.activeVisitors}</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Today's Orders</h3>
                <p className="text-2xl font-bold">{storeStats.todayOrders}</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Pending Orders</h3>
                <p className="text-2xl font-bold">{storeStats.pendingOrders}</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Today's Revenue</h3>
                <p className="text-2xl font-bold">${storeStats.todayRevenue.toLocaleString()}</p>
              </div>
              <button 
                className="w-full mt-4 inline-flex items-center justify-center rounded-md bg-muted hover:bg-muted/80 px-4 py-2 text-sm font-medium transition-colors"
                onClick={() => alert("Generating detailed report...")}
              >
                View Detailed Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-md w-full shadow-lg">
            <h3 className="text-lg font-semibold mb-2">
              {storeAction === 'open' ? "Open Store?" : "Close Store?"}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {storeAction === 'open' 
                ? "Are you sure you want to open your store? Customers will be able to place orders."
                : "Are you sure you want to close your store? Customers won't be able to place new orders."}
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button 
                className={cn(
                  "px-4 py-2 text-sm rounded-md text-white transition-colors",
                  storeAction === 'open' ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                )}
                onClick={confirmStoreAction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}