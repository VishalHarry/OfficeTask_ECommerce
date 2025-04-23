"use client"

import { useState, useEffect } from "react"
import { Bell, ShoppingBag, CreditCard, AlertCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useTheme } from "next-themes"

export default function NotificationsPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Ensure theme is only accessed after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "Order #12345 has shipped",
      message: "Your order has been shipped and will arrive in 2-3 business days.",
      date: "2023-06-15T10:30:00",
      isRead: false,
    },
    {
      id: 2,
      type: "payment",
      title: "Payment successful",
      message: "Your payment of $149.99 has been processed successfully.",
      date: "2023-06-14T15:45:00",
      isRead: true,
    },
    {
      id: 3,
      type: "alert",
      title: "Security alert",
      message: "We detected a login from a new device. Please verify if this was you.",
      date: "2023-06-13T08:20:00",
      isRead: false,
    },
    {
      id: 4,
      type: "order",
      title: "Order #12344 delivered",
      message: "Your order has been delivered. Enjoy your purchase!",
      date: "2023-06-10T14:15:00",
      isRead: true,
    },
    {
      id: 5,
      type: "alert",
      title: "Password changed",
      message: "Your account password was changed successfully.",
      date: "2023-06-08T11:30:00",
      isRead: true,
    },
  ])

  const [confirmClearDialog, setConfirmClearDialog] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState(null)

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })))
  }

  const handleClearAll = () => {
    setConfirmClearDialog(true)
  }

  const confirmClear = () => {
    setNotifications([])
    setConfirmClearDialog(false)
  }

  const handleViewNotification = (notification) => {
    setSelectedNotification(notification)
    if (!notification.isRead) {
      handleMarkAsRead(notification.id)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="h-5 w-5 text-blue-500" />
      case "payment":
        return <CreditCard className="h-5 w-5 text-green-500" />
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    }
  }

  const unreadCount = notifications.filter((notification) => !notification.isRead).length

  // If not mounted yet, don't render the UI to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">{unreadCount}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} className="border-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-300">
              Mark all as read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleClearAll} className="border-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-300">
              Clear all
            </Button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center transition-colors duration-300">
          <div className="flex justify-center mb-4">
            <Bell className="h-12 w-12 text-gray-300 dark:text-gray-600 transition-colors duration-300" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300">No notifications</h2>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">You're all caught up!</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer flex items-start gap-3 ${
                  !notification.isRead ? "bg-blue-50/50 dark:bg-blue-900/20" : ""
                }`}
                onClick={() => handleViewNotification(notification)}
              >
                <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-medium ${!notification.isRead ? "font-semibold" : ""} text-gray-900 dark:text-white transition-colors duration-300`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap transition-colors duration-300">{formatDate(notification.date)}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 transition-colors duration-300">{notification.message}</p>
                </div>
                {!notification.isRead && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleMarkAsRead(notification.id)
                    }}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-300"
                    aria-label="Mark as read"
                  >
                    <Check className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notification Detail Modal */}
      <Dialog open={!!selectedNotification} onOpenChange={(open) => !open && setSelectedNotification(null)}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-white transition-colors duration-300">
              {selectedNotification && getNotificationIcon(selectedNotification.type)}
              {selectedNotification?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">{selectedNotification?.message}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">{selectedNotification && formatDate(selectedNotification.date)}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedNotification(null)} className="bg-primary hover:bg-primary/90 text-white transition-colors duration-300">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Clear All Confirmation Dialog */}
      <Dialog open={confirmClearDialog} onOpenChange={setConfirmClearDialog}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white transition-colors duration-300">Clear All Notifications</DialogTitle>
          </DialogHeader>
          <p className="py-4 text-gray-600 dark:text-gray-300 transition-colors duration-300">Are you sure you want to clear all notifications? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmClearDialog(false)} className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmClear} className="transition-colors duration-300">
              Yes, clear all
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}