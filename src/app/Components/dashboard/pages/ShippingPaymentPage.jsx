"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, CreditCard, Wallet, Check } from "lucide-react"

export default function ShippingPaymentPage() {
  // Mock shipping addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      name: "John Doe",
      street: "456 Office Park",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "United States",
      isDefault: false,
    },
  ])

  // Mock payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Credit Card",
      cardType: "Visa",
      last4: "4242",
      expiry: "04/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "PayPal",
      email: "john@example.com",
      isDefault: false,
    },
  ])

  // Modal states
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(null)
  const [isAddingPayment, setIsAddingPayment] = useState(false)
  const [isEditingPayment, setIsEditingPayment] = useState(null)

  const handleAddressSubmit = (e) => {
    e.preventDefault()
    // Add/edit address logic
    setIsAddingAddress(false)
    setIsEditingAddress(null)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    // Add/edit payment logic
    setIsAddingPayment(false)
    setIsEditingPayment(null)
  }

  const setDefaultAddress = (addressId) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === addressId,
      })),
    )
  }

  const setDefaultPayment = (paymentId) => {
    setPaymentMethods(
      paymentMethods.map((payment) => ({
        ...payment,
        isDefault: payment.id === paymentId,
      })),
    )
  }

  const deleteAddress = (addressId) => {
    setAddresses(addresses.filter((address) => address.id !== addressId))
  }

  const deletePayment = (paymentId) => {
    setPaymentMethods(paymentMethods.filter((payment) => payment.id !== paymentId))
  }

  return (
    <div className="space-y-6">
      {/* Shipping Addresses */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Shipping Addresses</h2>
            <button
              onClick={() => setIsAddingAddress(true)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Plus size={16} className="mr-1" />
              Add Address
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`border rounded-lg p-4 relative ${
                  address.isDefault ? "border-primary bg-primary/5" : "border-gray-200"
                }`}
              >
                {address.isDefault && (
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}

                <div className="mb-2">
                  <h3 className="font-medium">{address.type}</h3>
                  <p className="text-sm text-gray-600">{address.name}</p>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <p>{address.country}</p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsEditingAddress(address.id)}
                    className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </button>
                  {!address.isDefault && (
                    <>
                      <button
                        onClick={() => setDefaultAddress(address.id)}
                        className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center"
                      >
                        <Check size={14} className="mr-1" />
                        Set as Default
                      </button>
                      <button
                        onClick={() => deleteAddress(address.id)}
                        className="text-sm text-gray-600 hover:text-red-500 transition-colors flex items-center"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Payment Methods</h2>
            <button
              onClick={() => setIsAddingPayment(true)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Plus size={16} className="mr-1" />
              Add Payment Method
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((payment) => (
              <div
                key={payment.id}
                className={`border rounded-lg p-4 relative ${
                  payment.isDefault ? "border-primary bg-primary/5" : "border-gray-200"
                }`}
              >
                {payment.isDefault && (
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}

                <div className="flex items-center mb-3">
                  {payment.type === "Credit Card" ? (
                    <CreditCard size={20} className="mr-2 text-gray-600" />
                  ) : (
                    <Wallet size={20} className="mr-2 text-gray-600" />
                  )}
                  <h3 className="font-medium">{payment.type}</h3>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  {payment.type === "Credit Card" && (
                    <>
                      <p>
                        {payment.cardType} •••• {payment.last4}
                      </p>
                      <p>Expires {payment.expiry}</p>
                    </>
                  )}
                  {payment.type === "PayPal" && <p>{payment.email}</p>}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsEditingPayment(payment.id)}
                    className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </button>
                  {!payment.isDefault && (
                    <>
                      <button
                        onClick={() => setDefaultPayment(payment.id)}
                        className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center"
                      >
                        <Check size={14} className="mr-1" />
                        Set as Default
                      </button>
                      <button
                        onClick={() => deletePayment(payment.id)}
                        className="text-sm text-gray-600 hover:text-red-500 transition-colors flex items-center"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
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
                    setIsEditingAddress(null)
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

      {/* Add/Edit Payment Modal */}
      {(isAddingPayment || isEditingPayment) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">
              {isAddingPayment ? "Add Payment Method" : "Edit Payment Method"}
            </h3>
            <form onSubmit={handlePaymentSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
                  <select
                    defaultValue="credit-card"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="credit-card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                {/* Credit Card Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="default-payment"
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="default-payment" className="ml-2 text-sm text-gray-700">
                    Set as default payment method
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingPayment(false)
                    setIsEditingPayment(null)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {isAddingPayment ? "Add Payment Method" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
