"use client"

import { useState } from "react"
import { Lock, Save, AlertTriangle } from "lucide-react"

export default function SettingsPage() {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState("")

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError("")
    setFormSuccess("")

    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setIsSubmitting(false)
      setFormError("New passwords don't match.")
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setFormSuccess("Password changed successfully!")
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }, 1000)
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-pink-950 dark:text-pink-100">Settings</h1>

      {/* Success/Error Messages */}
      {formSuccess && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 p-4 rounded-lg">
          {formSuccess}
        </div>
      )}

      {formError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-start">
          <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          {formError}
        </div>
      )}

      {/* Password Settings */}
      <div className="bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-pink-100 dark:border-pink-800">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            <h2 className="text-lg font-semibold text-pink-950 dark:text-pink-100">Change Password</h2>
          </div>
          <p className="text-sm text-pink-600/70 dark:text-pink-400/70 mt-1">Update your account password</p>
        </div>
        <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="current-password" className="text-sm font-medium text-pink-950 dark:text-pink-100">
              Current Password
            </label>
            <input
              id="current-password"
              name="currentPassword"
              type="password"
              required
              className="w-full h-10 rounded-md border border-pink-200 dark:border-pink-800 bg-white dark:bg-gray-800 px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-500"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="new-password" className="text-sm font-medium text-pink-950 dark:text-pink-100">
              New Password
            </label>
            <input
              id="new-password"
              name="newPassword"
              type="password"
              required
              className="w-full h-10 rounded-md border border-pink-200 dark:border-pink-800 bg-white dark:bg-gray-800 px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-500"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirm-password" className="text-sm font-medium text-pink-950 dark:text-pink-100">
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              required
              className="w-full h-10 rounded-md border border-pink-200 dark:border-pink-800 bg-white dark:bg-gray-800 px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-500"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-pink-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Change Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
