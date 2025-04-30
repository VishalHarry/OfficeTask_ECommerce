"use client"

import { useState, useEffect } from "react"
import { Camera, Edit, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"
import ConfirmationDialog from "@/app/Components/ConfirmationDialog"

export default function ProfilePage() {
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [showDeleteAddressConfirm, setShowDeleteAddressConfirm] = useState(false)
  const [addressToDelete, setAddressToDelete] = useState(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Use useEffect to handle mounting state
  useEffect(() => {
    setMounted(true)
  }, [])

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

  const confirmDeleteAddress = (addressId) => {
    setAddressToDelete(addressId)
    setShowDeleteAddressConfirm(true)
  }

  const deleteAddress = () => {
    if (addressToDelete) {
      setUserData({
        ...userData,
        addresses: userData.addresses.filter((address) => address.id !== addressToDelete),
      })
      setAddressToDelete(null)
    }
  }

  const preventPaste = (e) => {
    e.preventDefault()
    return false
  }

  return (
    <div className="space-y-6 transition-colors duration-300">
      {/* Profile Information Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="p-6 flex flex-col md:flex-row md:items-center gap-6">
          {/* Profile Image */}
          <div className="relative w-24 h-24 mx-auto md:mx-0">
            <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden transition-colors duration-300">
              {userData.profileImage ? (
                <div className="relative w-full h-full">
                <Image
                  src={userData.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              ) : (
                <span className="text-3xl font-semibold text-gray-400 dark:text-gray-300 transition-colors duration-300">{userData.name.charAt(0)}</span>
              )}
            </div>
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full cursor-pointer hover:bg-primary-dark transition-colors duration-300"
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
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">{userData.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{userData.email}</p>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{userData.phone}</p>

            <Button
              onClick={() => setIsEditingProfile(true)}
              variant="outline"
              className="mt-3 inline-flex items-center border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <Edit size={16} className="mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Shipping Addresses Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Shipping Addresses</h3>
            <Button
              onClick={() => setIsAddingAddress(true)}
              variant="outline"
              size="sm"
              className="inline-flex items-center border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <Plus size={16} className="mr-1" />
              Add Address
            </Button>
          </div>

          <div className="space-y-4 dark:border-gray-700" >
            {userData.addresses.map((address) => (
             <div key={address.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 relative bg-gray-50 dark:bg-gray-800 transition-colors duration-300">

                {address.isDefault && (
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">{address.type}</h4>
                  <Button
                    onClick={() => setIsEditingAddress(true)}
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary-dark transition-colors duration-300"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-300">
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Password & Security</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
            Secure your account with a strong password. We recommend changing your password periodically.
          </p>
          <Button onClick={() => setIsChangingPassword(true)}>Change Password</Button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white transition-colors duration-300">Edit Profile</DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400 transition-colors duration-300">Update your personal information below.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProfileSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  Full Name
                </label>
                <Input id="name" defaultValue={userData.name} className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors duration-300" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  Email Address
                </label>
                <Input id="email" type="email" defaultValue={userData.email} className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors duration-300" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  Phone Number
                </label>
                <Input id="phone" type="tel" defaultValue={userData.phone} className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors duration-300" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Change Password Modal */}
      <Dialog open={isChangingPassword} onOpenChange={setIsChangingPassword}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white transition-colors duration-300">Change Password</DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400 transition-colors duration-300">Enter your current password and a new password below.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="current-password" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  Current Password
                </label>
                <Input id="current-password" type="password" className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors duration-300" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="new-password" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  New Password
                </label>
                <Input id="new-password" type="password" className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors duration-300" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  Confirm New Password
                </label>
                <Input id="confirm-password" type="password" className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors duration-300" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Password</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Address Modal */}
      <Dialog
        open={isAddingAddress || isEditingAddress}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddingAddress(false)
            setIsEditingAddress(false)
          }
        }}
      >
        <DialogContent className="sm:max-w-[525px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white transition-colors duration-300">{isAddingAddress ? "Add New Address" : "Edit Address"}</DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400 transition-colors duration-300">Fill in the address details below.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddressSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="address-type" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  Address Type
                </label>
                <select
                  id="address-type"
                  defaultValue={isEditingAddress ? "Home" : ""}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-300"
                >
                  <option value="">Select Type</option>
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="street" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  Street Address
                </label>
                <Input id="street" defaultValue={isEditingAddress ? "123 Main Street" : ""} className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors duration-300" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="city" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    City
                  </label>
                  <Input id="city" defaultValue={isEditingAddress ? "New York" : ""} className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors duration-300" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="state" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    State/Province
                  </label>
                  <Input id="state" defaultValue={isEditingAddress ? "NY" : ""} className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors duration-300" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="zip" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    ZIP/Postal Code
                  </label>
                  <Input id="zip" defaultValue={isEditingAddress ? "10001" : ""} className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors duration-300" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="country" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    Country
                  </label>
                  <select
                    id="country"
                    defaultValue={isEditingAddress ? "US" : ""}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-300"
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
                  className="h-4 w-4 text-primary border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded focus:ring-primary transition-colors duration-300"
                />
                <label htmlFor="default-address" className="ml-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  Set as default address
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{isAddingAddress ? "Add Address" : "Save Changes"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Address Confirmation */}
      <ConfirmationDialog
        isOpen={showDeleteAddressConfirm}
        onClose={() => setShowDeleteAddressConfirm(false)}
        onConfirm={deleteAddress}
        title="Delete Address"
        description="Are you sure you want to delete this address? This action cannot be undone."
      />
    </div>
  )
}