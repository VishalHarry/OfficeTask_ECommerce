"use client"

import { useState, useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import { useTheme } from "next-themes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AccountSettingsPage() {
  // Theme handling
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Use useEffect to handle mounting state
  useEffect(() => {
    setMounted(true)
  }, [])

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
  const [deactivateConfirmText, setDeactivateConfirmText] = useState("")

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
    setDeactivateConfirmText("")
  }

  const preventPaste = (e) => {
    e.preventDefault()
    return false
  }

  return (
    <div className="space-y-6 transition-colors duration-300">
      {/* Email Notifications */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Email Notifications</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
            Manage the emails you want to receive. You will always receive transactional emails.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Order Updates</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Receive emails about your orders and shipping updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.orderUpdates}
                  onChange={() => handleToggle("notifications", "orderUpdates")}
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors duration-300"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Promotions and Discounts</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Receive emails about sales, offers, and discounts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.promotions}
                  onChange={() => handleToggle("notifications", "promotions")}
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors duration-300"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">New Arrivals</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Receive emails about new products and collections</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.newArrivals}
                  onChange={() => handleToggle("notifications", "newArrivals")}
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors duration-300"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Account Alerts</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Receive emails about your account activity and security</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.accountAlerts}
                  onChange={() => handleToggle("notifications", "accountAlerts")}
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors duration-300"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Preferences */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Privacy Preferences</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">Manage how your data is used and shared</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Data Sharing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
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
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors duration-300"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Marketing Consent</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Allow us to use your data for marketing purposes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.privacy.marketingConsent}
                  onChange={() => handleToggle("privacy", "marketingConsent")}
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors duration-300"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Third-Party Sharing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Allow us to share your data with trusted partners</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.privacy.thirdPartyConsent}
                  onChange={() => handleToggle("privacy", "thirdPartyConsent")}
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors duration-300"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Account Deactivation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Account Deactivation</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
            Deactivating your account will remove your personal information from our site. This action cannot be undone.
          </p>

          <Button onClick={() => setIsDeactivateModalOpen(true)} variant="destructive">
            Deactivate Account
          </Button>
        </div>
      </div>

      {/* Deactivate Account Modal */}
      <Dialog open={isDeactivateModalOpen} onOpenChange={setIsDeactivateModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
          <DialogHeader>
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 transition-colors duration-300">
              <AlertTriangle size={20} />
              <DialogTitle className="text-red-600 dark:text-red-400 transition-colors duration-300">Deactivate Account</DialogTitle>
            </div>
            <DialogDescription className="text-gray-500 dark:text-gray-400 transition-colors duration-300">
              Are you sure you want to deactivate your account? All of your data will be permanently removed. This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <label htmlFor="confirm-deactivate" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-300">
              Please type "DEACTIVATE" to confirm
            </label>
            <Input
              id="confirm-deactivate"
              value={deactivateConfirmText}
              onChange={(e) => setDeactivateConfirmText(e.target.value)}
              onPaste={preventPaste}
              className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors duration-300"
            />
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeactivateModalOpen(false)}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeactivateAccount}
              disabled={deactivateConfirmText !== "DEACTIVATE"}
            >
              Deactivate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}