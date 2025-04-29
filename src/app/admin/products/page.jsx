"use client"

import { useState } from "react"
import { Search, Plus, Filter, Edit, Trash2, X, Upload, Check, AlertTriangle, Eye, Download, FileUp } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Sample product data with enhanced attributes for sanitary products
const initialProducts = [
  {
    id: 1,
    name: "Organic Cotton Pads",
    image: "/placeholder.svg?height=80&width=80",
    price: 19.99,
    stock: 100,
    category: "Sanitary Pads",
    status: "active",
    images: [null, null, null, null],
    variants: [
      {
        size: "Regular",
        absorbency: "Medium",
        count: "10 pads",
        price: 19.99,
        stock: 50
      },
      {
        size: "Large",
        absorbency: "Heavy",
        count: "10 pads",
        price: 21.99,
        stock: 50
      }
    ],
    attributes: {
      material: "100% Organic Cotton",
      type: "Disposable",
      wings: "Yes",
      packaging: "Biodegradable"
    },
    description: "Eco-friendly organic cotton pads with superior absorption",
    reorderPoint: 20,
    discount: {
      type: "percentage",
      value: 10,
      validUntil: "2024-12-31"
    }
  },
  {
    id: 2,
    name: "Biodegradable Panty Liners",
    image: "/placeholder.svg?height=80&width=80",
    price: 9.99,
    stock: 150,
    category: "Feminine Hygiene",
    status: "active",
    images: [null, null, null, null],
    attributes: [],
  },
  {
    id: 3,
    name: "Reusable Menstrual Cup",
    image: "/placeholder.svg?height=80&width=80",
    price: 39.97,
    stock: 75,
    category: "Feminine Hygiene",
    status: "active",
    images: [null, null, null, null],
    attributes: [],
  },
  {
    id: 4,
    name: "Herbal Sanitary Pads",
    image: "/placeholder.svg?height=80&width=80",
    price: 12.75,
    stock: 200,
    category: "Feminine Hygiene",
    status: "active",
    images: [null, null, null, null],
    attributes: [],
  },
  {
    id: 5,
    name: "Eco-Friendly Tampons",
    image: "/placeholder.svg?height=80&width=80",
    price: 14.99,
    stock: 120,
    category: "Feminine Hygiene",
    status: "active",
    images: [null, null, null, null],
    attributes: [],
  },
]

// Enhanced categories and attributes
const categories = ["All Categories", "Sanitary Pads", "Tampons", "Menstrual Cups", "Panty Liners", "Period Underwear"]
const absorbencyLevels = ["Light", "Medium", "Heavy", "Super Heavy"]
const sizes = ["Small", "Regular", "Large", "Extra Large"]
const packagingSizes = ["8 pads", "10 pads", "12 pads", "14 pads", "16 pads"]

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showVariantForm, setShowVariantForm] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [bulkImportModal, setBulkImportModal] = useState(false)
  const [discountForm, setDiscountForm] = useState(false)

  const handleBulkExport = () => {
    // Convert products data to CSV format
    const headers = ["ID", "Name", "Category", "Price", "Stock", "Status"]
    const productsData = products.map(product => [
      product.id,
      product.name,
      product.category,
      product.price,
      product.stock,
      product.status
    ])

    const csvContent = [
      headers.join(","),
      ...productsData.map(row => row.join(","))
    ].join("\n")

    // Create blob and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `products_export_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "Sanitary Pads",
    images: [null, null, null, null],
    variants: [],
    attributes: {
      material: "",
      type: "",
      wings: "No",
      packaging: ""
    },
    description: "",
    reorderPoint: 20,
    discount: null
  })
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 300])
  const [stockFilter, setStockFilter] = useState("all") // all, in-stock, out-of-stock
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const [showProductView, setShowProductView] = useState(false)
  const [viewProduct, setViewProduct] = useState(null)

  // Filter products based on search term, category, and other filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "in-stock" && product.stock > 0) ||
      (stockFilter === "out-of-stock" && product.stock === 0)

    return matchesSearch && matchesCategory && matchesPrice && matchesStock
  })

  const handleAddProduct = (e) => {
    e.preventDefault()
    const id = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1
    const productToAdd = {
      ...newProduct,
      id,
      price: Number.parseFloat(newProduct.price),
      stock: Number.parseInt(newProduct.stock),
      status: "active",
      image: newProduct.image || "/placeholder.svg?height=80&width=80",
    }

    setProducts([...products, productToAdd])
    setNewProduct({
      name: "",
      price: "",
      stock: "",
      category: "Electronics",
      customCategory: "",
      description: "",
      attributes: [],
      images: [null, null, null, null],
      image: null,
    })
    setShowAddForm(false)
  }

  const handleUpdateProduct = (e) => {
    e.preventDefault()
    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id ? { ...editingProduct } : product,
    )
    setProducts(updatedProducts)
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const handleToggleStatus = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, status: product.status === "active" ? "inactive" : "active" } : product,
      ),
    )
  }

  const handleAddAttribute = (attribute) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        attributes: {
          ...editingProduct.attributes,
          ...attribute
        }
      })
    } else {
      setNewProduct({
        ...newProduct,
        attributes: {
          ...newProduct.attributes,
          ...attribute
        }
      })
    }
  }

  const handleRemoveAttribute = (key) => {
    if (editingProduct) {
      const newAttributes = { ...editingProduct.attributes }
      delete newAttributes[key]
      setEditingProduct({
        ...editingProduct,
        attributes: newAttributes,
      })
    } else {
      const newAttributes = { ...newProduct.attributes }
      delete newAttributes[key]
      setNewProduct({
        ...newProduct,
        attributes: newAttributes,
      })
    }
  }

  const handleImageChange = (e, index) => {

    if (editingProduct) {
      const newImages = [...(editingProduct.images || [null, null, null, null])]
      newImages[index] = "/placeholder.svg?height=80&width=80&text=New+Image"
      setEditingProduct({
        ...editingProduct,
        images: newImages,
      })
    } else {
      const newImages = [...newProduct.images]
      newImages[index] = "/placeholder.svg?height=80&width=80&text=New+Image"
      setNewProduct({
        ...newProduct,
        images: newImages,
      })
    }
  }

  const confirmDelete = () => {
    if (productToDelete) {
      handleDeleteProduct(productToDelete)
      setShowDeleteConfirm(false)
      setProductToDelete(null)
    }
  }

  // Modify the delete handler to show confirmation first
  const handleDeleteClick = (id) => {
    setProductToDelete(id)
    setShowDeleteConfirm(true)
  }

  // Add function to view product details
  const handleViewProduct = (product) => {
    setViewProduct(product)
    setShowProductView(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBulkImportModal(true)}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-muted"
          >
            <FileUp className="mr-2 h-4 w-4" />
            Import
          </button>
          <button
            onClick={handleBulkExport}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-muted"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center justify-center rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search products..."
            className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-muted"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-background border border-border rounded-lg p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium">Price Range</label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="0"
                  placeholder="Min"
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                />
                <span className="text-muted-foreground">to</span>
                <input
                  type="number"
                  min="0"
                  placeholder="Max"
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 0])}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Stock Status</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stock-filter"
                    checked={stockFilter === "all"}
                    onChange={() => setStockFilter("all")}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">All</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stock-filter"
                    checked={stockFilter === "in-stock"}
                    onChange={() => setStockFilter("in-stock")}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stock-filter"
                    checked={stockFilter === "out-of-stock"}
                    onChange={() => setStockFilter("out-of-stock")}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">Out of Stock</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-background border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-muted-foreground bg-muted/50">
                <th className="font-medium text-left py-3 px-4">Product</th>
                <th className="font-medium text-left py-3 px-4">Category</th>
                <th className="font-medium text-left py-3 px-4">Price</th>
                <th className="font-medium text-left py-3 px-4">Stock</th>
                <th className="font-medium text-left py-3 px-4">Status</th>
                <th className="font-medium text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <div className="relative w-full h-full">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="100vw"
                          />
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{product.category}</td>
                  <td className="py-3 px-4 text-sm">₹{product.price.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                        product.stock > 10
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : product.stock > 0
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                      )}
                    >
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full mr-2",
                          product.status === "active" ? "bg-green-500" : "bg-red-500",
                        )}
                      ></div>
                      <span className="text-sm capitalize">{product.status}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewProduct(product)}
                        className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                        title="Edit Product"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product.id)}
                        className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                        title="Delete Product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(product.id)}
                        className={cn(
                          "p-1 rounded-md hover:bg-muted",
                          product.status === "active"
                            ? "text-green-500 hover:text-green-600"
                            : "text-red-500 hover:text-red-600",
                        )}
                        title={product.status === "active" ? "Active" : "Inactive"}
                      >
                        {product.status === "active" ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
              <AlertTriangle className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you&apos;re looking for.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredProducts.length}</span> of{" "}
          <span className="font-medium">{products.length}</span> products
        </p>
        <div className="flex items-center space-x-2">
          <button
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-muted disabled:opacity-50"
            disabled
          >
            Previous
          </button>
          <button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
            1
          </button>
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-muted">
            2
          </button>
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-muted">
            Next
          </button>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold">Add New Product</h3>
              <button onClick={() => setShowAddForm(false)} className="p-1 rounded-full hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Product Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Price (₹)
                  </label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="stock" className="text-sm font-medium">
                    Stock Quantity
                  </label>
                  <input
                    id="stock"
                    type="number"
                    min="0"
                    required
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <select
                    id="category"
                    required
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    {categories
                      .filter((c) => c !== "All Categories")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="customCategory" className="text-sm font-medium">
                    Custom Category
                  </label>
                  <input
                    id="customCategory"
                    type="text"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={newProduct.customCategory}
                    onChange={(e) => setNewProduct({ ...newProduct, customCategory: e.target.value })}
                    placeholder="Enter if category not listed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Product Attributes</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {Object.entries(newProduct.attributes).map(([key, value], idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                      <div>
                        <span className="font-medium capitalize">{key}: </span>
                        <span>{value}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttribute(key)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="attribute"
                    className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Add attribute (e.g., &apos;Waterproof&apos;, &apos;Wireless&apos;)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        if (e.target.value.trim()) {
                          handleAddAttribute(e.target.value.trim())
                          e.target.value = ""
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-muted text-sm font-medium rounded-md hover:bg-muted/80"
                    onClick={(e) => {
                      const input = document.getElementById("attribute")
                      if (input.value.trim()) {
                        handleAddAttribute(input.value.trim())
                        input.value = ""
                      }
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Product Images</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {newProduct.images.map((img, idx) => (
                    <div key={idx} className="border-2 border-dashed border-border rounded-md p-2">
                      <div className="aspect-square relative bg-muted rounded-md overflow-hidden">
                        {img ? (
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`Product image ${idx + 1}`}
                            className="object-cover w-full h-full"
                            width={500}  // Set the width based on your layout
                            height={500} // Set the height based on your layout
                          />

                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <label
                          htmlFor={`file-upload-${idx}`}
                          className="cursor-pointer text-xs font-medium text-primary hover:text-primary/90"
                        >
                          {img ? "Change" : "Upload"}
                          <input
                            id={`file-upload-${idx}`}
                            name={`file-upload-${idx}`}
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => handleImageChange(e, idx)}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-input bg-background text-sm font-medium rounded-md shadow-sm hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md shadow-sm hover:bg-primary/90"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold">Edit Product</h3>
              <button onClick={() => setEditingProduct(null)} className="p-1 rounded-full hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateProduct} className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="edit-name" className="text-sm font-medium">
                  Product Name
                </label>
                <input
                  id="edit-name"
                  type="text"
                  required
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-price" className="text-sm font-medium">
                    Price (₹)
                  </label>
                  <input
                    id="edit-price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number.parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-stock" className="text-sm font-medium">
                    Stock Quantity
                  </label>
                  <input
                    id="edit-stock"
                    type="number"
                    min="0"
                    required
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-category" className="text-sm font-medium">
                    Category
                  </label>
                  <select
                    id="edit-category"
                    required
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  >
                    {categories
                      .filter((c) => c !== "All Categories")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-customCategory" className="text-sm font-medium">
                    Custom Category
                  </label>
                  <input
                    id="edit-customCategory"
                    type="text"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={editingProduct.customCategory || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, customCategory: e.target.value })}
                    placeholder="Enter if category not listed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Product Attributes</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(editingProduct.attributes || []).map((attr, idx) => (
                    <div key={idx} className="flex items-center bg-muted px-2 py-1 rounded-md">
                      <span className="text-xs mr-1">{attr}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttribute(idx)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="edit-attribute"
                    className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Add attribute (e.g., &apos;Waterproof&apos;, &apos;Wireless&apos;)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        if (e.target.value.trim()) {
                          handleAddAttribute(e.target.value.trim())
                          e.target.value = ""
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-muted text-sm font-medium rounded-md hover:bg-muted/80"
                    onClick={(e) => {
                      const input = document.getElementById("edit-attribute")
                      if (input.value.trim()) {
                        handleAddAttribute(input.value.trim())
                        input.value = ""
                      }
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={editingProduct.description || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Product Images</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(editingProduct.images || [null, null, null, null]).map((img, idx) => (
                    <div key={idx} className="border-2 border-dashed border-border rounded-md p-2">
                      <div className="aspect-square relative bg-muted rounded-md overflow-hidden">
                        {img ? (
                          <Image
                            src={img || "/placeholder.svg"} // Fallback to placeholder if img is not available
                            alt={`Product image ${idx + 1}`}
                            className="object-cover w-full h-full"
                            width={500}  // Set the width according to your layout
                            height={500} // Set the height according to your layout
                          />

                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <label
                          htmlFor={`edit-file-upload-${idx}`}
                          className="cursor-pointer text-xs font-medium text-primary hover:text-primary/90"
                        >
                          {img ? "Change" : "Upload"}
                          <input
                            id={`edit-file-upload-${idx}`}
                            name={`edit-file-upload-${idx}`}
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => handleImageChange(e, idx)}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border border-input bg-background text-sm font-medium rounded-md shadow-sm hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md shadow-sm hover:bg-primary/90"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-input bg-background text-sm font-medium rounded-md shadow-sm hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showProductView && viewProduct && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold">Product Details</h3>
              <button onClick={() => setShowProductView(false)} className="p-1 rounded-full hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-square relative rounded-md overflow-hidden bg-muted mb-4">
                    <Image
                      src={viewProduct.image || "/placeholder.svg"}  // Fallback to placeholder if image is not available
                      alt={viewProduct.name} // Use the product name as alt text for better SEO and accessibility
                      className="object-cover w-full h-full" // Tailwind classes for responsive and cover behavior
                      width={500} // Set a fixed width for the image
                      height={500} // Set a fixed height for the image
                    />

                  </div>
                  {viewProduct.images && viewProduct.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {viewProduct.images.map(
                        (img, idx) =>
                          img && (
                            <div key={idx} className="aspect-square relative rounded-md overflow-hidden bg-muted">
                              <div className="relative w-full h-full">
                                <Image
                                  src={img || "/placeholder.svg"}
                                  alt={`Product view ${idx + 1}`}
                                  fill
                                  className="object-cover"
                                  sizes="100vw"
                                />
                              </div>
                            </div>
                          ),
                      )}
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">{viewProduct.name}</h2>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">₹{viewProduct.price?.toFixed(2)}</span>
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                        viewProduct.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                      )}
                    >
                      {viewProduct.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Category</h3>
                    <p>{viewProduct.category}</p>
                    {viewProduct.customCategory && (
                      <p className="text-sm text-muted-foreground mt-1">Custom: {viewProduct.customCategory}</p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Stock</h3>
                    <p>{viewProduct.stock} units</p>
                  </div>
                  {viewProduct.attributes && viewProduct.attributes.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Attributes</h3>
                      <div className="flex flex-wrap gap-2">
                        {viewProduct.attributes.map((attr, idx) => (
                          <span key={idx} className="px-2 py-1 bg-muted rounded-md text-xs">
                            {attr}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                    <p className="text-sm">{viewProduct.description || "No description available."}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-6 border-t border-border">
              <button
                onClick={() => setShowProductView(false)}
                className="px-4 py-2 border border-input bg-background text-sm font-medium rounded-md shadow-sm hover:bg-muted"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
