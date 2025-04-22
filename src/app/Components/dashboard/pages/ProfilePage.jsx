"use client"

import { useState } from "react"
import { Camera, Edit, Plus } from "lucide-react"

export default function ProfilePage() {
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)

  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    profileImage: null,
    addresses: [
      {
        id: 1,
        type: "Home",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
        isDefault: true,
      },
    ],
  })

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real app, you would upload this file to your server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      setUserData({
        ...userData,
        profileImage: imageUrl,
      })
    }
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    // Save profile changes
    setIsEditingProfile(false)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    // Change password logic
    setIsChangingPassword(false)
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault()
    // Add/edit address logic
    setIsAddingAddress(false)
    setIsEditingAddress(false)
  }

  return (
    <div className="space-y-6">
      {/* Profile Information Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row md:items-center gap-6">
          {/* Profile Image */}
          <div className="relative w-24 h-24 mx-auto md:mx-0">
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {userData.profileImage ? (
                <img
                  src={userData.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-semibold text-gray-400">{userData.name.charAt(0)}</span>
              )}
            </div>
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full cursor-pointer hover:bg-primary-dark transition-colors"
            >
              <Camera size={16} />
              <input
                type="file"
                id="profile-image"
                className="hidden"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </label>
          </div>

          {/* Profile Details */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold">{userData.name}</h2>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-gray-600">{userData.phone}</p>

            <button
              onClick={() => setIsEditingProfile(true)}
              className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Edit size={16} className="mr-2" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Shipping Addresses Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Shipping Addresses</h3>
            <button
              onClick={() => setIsAddingAddress(true)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Plus size={16} className="mr-1" />
              Add Address
            </button>
          </div>

          <div className="space-y-4">
            {userData.addresses.map((address) => (
              <div key={address.id} className="border border-gray-200 rounded-lg p-4 relative">
                {address.isDefault && (
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}
                <div className="flex justify-between">
                  <h4 className="font-medium">{address.type}</h4>
                  <button
                    onClick={() => setIsEditingAddress(true)}
                    className="text-primary hover:underline text-sm flex items-center"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </button>
                </div>
                <p className="text-gray-600 mt-1">
                  {address.street}
                  <br />
                  {address.city}, {address.state} {address.zip}
                  <br />
                  {address.country}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Password Change Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Password & Security</h3>
          <p className="text-gray-600 mb-4">
            Secure your account with a strong password. We recommend changing your password periodically.
          </p>
          <button
            onClick={() => setIsChangingPassword(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <form onSubmit={handleProfileSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={userData.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue={userData.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={userData.phone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isChangingPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Address Modal */}
      {(isAddingAddress || isEditingAddress) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">{isAddingAddress ? "Add New Address" : "Edit Address"}</h3>
            <form onSubmit={handleAddressSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                  <select
                    defaultValue={isEditingAddress ? "Home" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="">Select Type</option>
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    defaultValue={isEditingAddress ? "123 Main Street" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      defaultValue={isEditingAddress ? "New York" : ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                    <input
                      type="text"
                      defaultValue={isEditingAddress ? "NY" : ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                    <input
                      type="text"
                      defaultValue={isEditingAddress ? "10001" : ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select
                      defaultValue={isEditingAddress ? "US" : ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="default-address"
                    defaultChecked={isEditingAddress}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="default-address" className="ml-2 text-sm text-gray-700">
                    Set as default address
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingAddress(false)
                    setIsEditingAddress(false)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {isAddingAddress ? "Add Address" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
