"use client"

import { useState } from "react"
import { AlertTriangle } from "lucide-react"

export default function AccountSettingsPage() {
  // Mock settings data
  const [settings, setSettings] = useState({
    notifications: {
      orderUpdates: true,
      promotions: true,
      newArrivals: false,
      accountAlerts: true,
    },
    privacy: {
      shareData: false,
      marketingConsent: true,
      thirdPartyConsent: false,
    },
  })

  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)

  const handleToggle = (category, setting) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: !settings[category][setting],
      },
    })
  }

  const handleDeactivateAccount = () => {
    // Account deactivation logic would go here
    console.log("Account deactivated")
    setIsDeactivateModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Email Notifications</h2>
          <p className="text-gray-600 mb-6">
            Manage the emails you want to receive. You will always receive transactional emails.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Order Updates</h3>
                <p className="text-sm text-gray-600">Receive emails about your orders and shipping updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.orderUpdates}
                  onChange={() => handleToggle("notifications", "orderUpdates")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Promotions and Discounts</h3>
                <p className="text-sm text-gray-600">Receive emails about sales, offers, and discounts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.promotions}
                  onChange={() => handleToggle("notifications", "promotions")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">New Arrivals</h3>
                <p className="text-sm text-gray-600">Receive emails about new products and collections</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.newArrivals}
                  onChange={() => handleToggle("notifications", "newArrivals")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Account Alerts</h3>
                <p className="text-sm text-gray-600">Receive emails about your account activity and security</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.accountAlerts}
                  onChange={() => handleToggle("notifications", "accountAlerts")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Preferences */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Privacy Preferences</h2>
          <p className="text-gray-600 mb-6">Manage how your data is used and shared</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Data Sharing</h3>
                <p className="text-sm text-gray-600">
                  Allow us to use your shopping data to improve our recommendations
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.privacy.shareData}
                  onChange={() => handleToggle("privacy", "shareData")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Marketing Consent</h3>
                <p className="text-sm text-gray-600">Allow us to use your data for marketing purposes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.privacy.marketingConsent}
                  onChange={() => handleToggle("privacy", "marketingConsent")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Third-Party Sharing</h3>
                <p className="text-sm text-gray-600">Allow us to share your data with trusted partners</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.privacy.thirdPartyConsent}
                  onChange={() => handleToggle("privacy", "thirdPartyConsent")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Account Deactivation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Account Deactivation</h2>
          <p className="text-gray-600 mb-6">
            Deactivating your account will remove your personal information from our site. This action cannot be undone.
          </p>

          <button
            onClick={() => setIsDeactivateModalOpen(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Deactivate Account
          </button>
        </div>
      </div>

      {/* Deactivate Account Modal */}
      {isDeactivateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-center mb-4 text-red-600">
              <AlertTriangle size={24} className="mr-2" />
              <h3 className="text-lg font-semibold">Deactivate Account</h3>
            </div>

            <p className="text-gray-600 mb-4">
              Are you sure you want to deactivate your account? All of your data will be permanently removed. This
              action cannot be undone.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Please type "DEACTIVATE" to confirm
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeactivateModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeactivateAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
