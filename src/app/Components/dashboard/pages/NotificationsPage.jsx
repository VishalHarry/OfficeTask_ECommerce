"use client"

import { useState } from "react"
import { Check, ShoppingBag, Truck, Tag, CreditCard, Trash2, Bell } from "lucide-react"

export default function NotificationsPage() {
  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "Your order has been shipped",
      message: "Order #12345 has been shipped and is on its way to you.",
      time: "2 hours ago",
      isRead: false,
      icon: Truck,
    },
    {
      id: 2,
      type: "promo",
      title: "Flash Sale: 50% OFF",
      message: "Don't miss our 24-hour flash sale with up to 50% off on selected items.",
      time: "1 day ago",
      isRead: false,
      icon: Tag,
    },
    {
      id: 3,
      type: "order",
      title: "Order Delivered",
      message: "Your order #12344 has been delivered. Enjoy your purchase!",
      time: "3 days ago",
      isRead: true,
      icon: ShoppingBag,
    },
    {
      id: 4,
      type: "payment",
      title: "Payment Successful",
      message: "Your payment of $89.97 was successfully processed.",
      time: "1 week ago",
      isRead: true,
      icon: CreditCard,
    },
  ])

  const markAsRead = (notificationId) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })))
  }

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter((notification) => notification.id !== notificationId))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">Notifications</h2>
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-primary text-white text-xs rounded-full">{unreadCount} new</span>
              )}
            </div>

            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-sm text-primary hover:underline flex items-center">
                  <Check size={14} className="mr-1" />
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="text-sm text-gray-600 hover:text-red-500 hover:underline flex items-center"
                >
                  <Trash2 size={14} className="mr-1" />
                  Clear all
                </button>
              )}
            </div>
          </div>

          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border rounded-lg p-4 transition-colors ${
                    notification.isRead ? "border-gray-200" : "border-primary bg-primary/5"
                  }`}
                >
                  <div className="flex">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        notification.isRead ? "bg-gray-100 text-gray-500" : "bg-primary/10 text-primary"
                      }`}
                    >
                      <notification.icon size={20} />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{notification.title}</h3>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{notification.message}</p>

                      <div className="flex justify-end mt-2 space-x-2">
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-primary hover:underline flex items-center"
                          >
                            <Check size={12} className="mr-1" />
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-xs text-gray-500 hover:text-red-500 hover:underline flex items-center"
                        >
                          <Trash2 size={12} className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Bell size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No notifications</h3>
              <p className="text-gray-500">You're all caught up! Check back later for new updates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
