"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ShippingPaymentPage() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
      phone: "(555) 123-4567",
      isDefault: true,
    },
    {
      id: 2,
      name: "John Doe",
      address: "456 Park Ave",
      city: "Boston",
      state: "MA",
      zip: "02108",
      country: "United States",
      phone: "(555) 987-6543",
      isDefault: false,
    },
  ])

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState(null)
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState({ isOpen: false, addressId: null })

  const handleAddAddress = () => {
    setCurrentAddress(null)
    setIsAddressModalOpen(true)
  }

  const handleEditAddress = (address) => {
    setCurrentAddress(address)
    setIsAddressModalOpen(true)
  }

  const handleDeleteAddress = (id) => {
    setConfirmDeleteDialog({ isOpen: true, addressId: id })
  }

  const confirmDeleteAddress = () => {
    if (confirmDeleteDialog.addressId) {
      setAddresses(addresses.filter((address) => address.id !== confirmDeleteDialog.addressId))
      setConfirmDeleteDialog({ isOpen: false, addressId: null })
    }
  }

  const handleSaveAddress = (e) => {
    e.preventDefault()
    // Form handling logic would go here
    setIsAddressModalOpen(false)
  }

  const preventPaste = (e) => {
    e.preventDefault()
    return false
  }

  return (
    <div className="space-y-6">
      {/* Shipping Addresses */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Shipping Addresses</h2>
            <Button onClick={handleAddAddress} size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Add Address</span>
            </Button>
          </div>

          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`border ${address.isDefault ? "border-primary" : "border-gray-200"} rounded-lg p-4 relative`}
              >
                {address.isDefault && (
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs px-2 py-1 rounded">Default</div>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="mb-3 sm:mb-0">
                    <p className="font-semibold">{address.name}</p>
                    <p className="text-gray-600 text-sm">{address.address}</p>
                    <p className="text-gray-600 text-sm">
                      {address.city}, {address.state} {address.zip}
                    </p>
                    <p className="text-gray-600 text-sm">{address.country}</p>
                    <p className="text-gray-600 text-sm">{address.phone}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditAddress(address)}
                      className="flex items-center gap-1"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span>Edit</span>
                    </Button>
                    {!address.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAddress(address.id)}
                        className="flex items-center gap-1 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{currentAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveAddress}>
            <div className="grid grid-cols-1 gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={currentAddress?.name || ""} onPaste={preventPaste} required />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" defaultValue={currentAddress?.address || ""} onPaste={preventPaste} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue={currentAddress?.city || ""} onPaste={preventPaste} required />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" defaultValue={currentAddress?.state || ""} onPaste={preventPaste} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="zip">ZIP/Postal Code</Label>
                  <Input id="zip" defaultValue={currentAddress?.zip || ""} onPaste={preventPaste} required />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue={currentAddress?.country || ""} onPaste={preventPaste} required />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue={currentAddress?.phone || ""} onPaste={preventPaste} required />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="default-address"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  defaultChecked={currentAddress?.isDefault || false}
                />
                <Label htmlFor="default-address" className="text-sm font-normal">
                  Set as default shipping address
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddressModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Address</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDeleteDialog.isOpen}
        onOpenChange={(open) => setConfirmDeleteDialog({ ...confirmDeleteDialog, isOpen: open })}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Address</DialogTitle>
          </DialogHeader>
          <p className="py-4">Are you sure you want to delete this address? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteDialog({ isOpen: false, addressId: null })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteAddress}>
              Yes, delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
