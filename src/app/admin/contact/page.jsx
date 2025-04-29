"use client"

import { Phone, Mail, MapPin, Globe, Save } from "lucide-react"

export default function ContactInfoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-pink-950 dark:text-pink-50">Contact Information</h1>
        <button className="inline-flex items-center justify-center rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-pink-950 dark:text-pink-50 mb-4">Primary Contact</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Phone className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <input
                  type="tel"
                  className="mt-1 block w-full rounded-md border border-pink-200 dark:border-pink-800 shadow-sm p-2"
                  defaultValue="+91 123 456 7890"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Mail className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border border-pink-200 dark:border-pink-800 shadow-sm p-2"
                  defaultValue="contact@edukan.com"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                <textarea
                  className="mt-1 block w-full rounded-md border border-pink-200 dark:border-pink-800 shadow-sm p-2"
                  rows="3"
                  defaultValue="123 Business Street&#10;New Delhi, India 110001"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-pink-950 dark:text-pink-50 mb-4">Social Media</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Globe className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
                <input
                  type="url"
                  className="mt-1 block w-full rounded-md border border-pink-200 dark:border-pink-800 shadow-sm p-2"
                  defaultValue="https://www.edukan.com"
                />
              </div>
            </div>

            <div className="space-y-4">
              {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((platform) => (
                <div key={platform} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{platform}</label>
                    <input
                      type="url"
                      className="mt-1 block w-full rounded-md border border-pink-200 dark:border-pink-800 shadow-sm p-2"
                      placeholder={`Enter ${platform} URL`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}