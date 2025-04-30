"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"
import { Calendar, ChevronDown, Download, FileText, Users, BarChart3, ShoppingBag, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample data for charts
const dailySalesData = [
  { name: "Mon", sales: 3000 },
  { name: "Tue", sales: 3500 },
  { name: "Wed", sales: 4000 },
  { name: "Thu", sales: 4500 },
  { name: "Fri", sales: 5000 },
  { name: "Sat", sales: 5500 },
  { name: "Sun", sales: 6000 },
]

const weeklySalesData = [
  { name: "Week 1", sales: 20000 },
  { name: "Week 2", sales: 25000 },
  { name: "Week 3", sales: 30000 },
  { name: "Week 4", sales: 35000 },
]

const monthlySalesData = [
  { name: "Jan", sales: 80000 },
  { name: "Feb", sales: 85000 },
  { name: "Mar", sales: 90000 },
  { name: "Apr", sales: 95000 },
  { name: "May", sales: 100000 },
  { name: "Jun", sales: 105000 },
  { name: "Jul", sales: 110000 },
  { name: "Aug", sales: 115000 },
  { name: "Sep", sales: 120000 },
  { name: "Oct", sales: 125000 },
  { name: "Nov", sales: 130000 },
  { name: "Dec", sales: 135000 },
]

const categoryData = [
  { name: "Feminine Hygiene", value: 40 },
  { name: "Electronics", value: 30 },
  { name: "Clothing", value: 20 },
  { name: "Home", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

// New data for customer analytics
const customerData = {
  repeatBuyers: 65,
  newCustomers: 35,
  demographics: [
    { age: "18-24", percentage: 25 },
    { age: "25-34", percentage: 40 },
    { age: "35-44", percentage: 20 },
    { age: "45+", percentage: 15 }
  ],
  locations: [
    { city: "Mumbai", customers: 30 },
    { city: "Delhi", customers: 25 },
    { city: "Bangalore", customers: 20 },
    { city: "Others", customers: 25 }
  ]
}

// Inventory turnover data
const inventoryData = [
  { product: "Organic Cotton Pads", turnover: 4.5, stock: 250 },
  { product: "Biodegradable Liners", turnover: 3.8, stock: 180 },
  { product: "Menstrual Cups", turnover: 2.5, stock: 120 },
  { product: "Period Underwear", turnover: 3.2, stock: 150 }
]

// Traffic and conversion data
const trafficData = {
  visitors: 12500,
  conversions: 425,
  conversionRate: 3.4,
  sources: [
    { source: "Direct", visits: 4500 },
    { source: "Social", visits: 3500 },
    { source: "Search", visits: 3000 },
    { source: "Referral", visits: 1500 }
  ]
}

export default function SalesAnalysisPage() {
  const [activeTab, setActiveTab] = useState("sales")
  const [timeRange, setTimeRange] = useState("daily")
  const [dateRange, setDateRange] = useState("This Week")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showExportOptions, setShowExportOptions] = useState(false)  // Add this line

  // Function to handle report export
  const handleExport = (format) => {
    // Implementation for export functionality
    console.log(`Exporting in ${format} format`)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-pink-100 dark:border-pink-800">
        <h1 className="text-2xl font-bold text-pink-950 dark:text-pink-100">Analytics Dashboard</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="inline-flex items-center justify-center rounded-md border border-pink-200 dark:border-pink-800 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium shadow-sm hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
            >
              <Calendar className="mr-2 h-4 w-4 text-pink-600 dark:text-pink-400" />
              {dateRange}
              <ChevronDown className="ml-2 h-4 w-4 text-pink-600 dark:text-pink-400" />
            </button>
            {showDatePicker && (
              <div className="absolute right-0 z-10 mt-2 w-56 rounded-md border border-pink-200 dark:border-pink-800 bg-white dark:bg-gray-800 shadow-lg">
                <div className="py-1">
                  {["Today", "Yesterday", "This Week", "Last Week", "This Month", "Last Month", "This Year"].map(
                    (range) => (
                      <button
                        key={range}
                        className={cn(
                          "block w-full px-4 py-2 text-left text-sm",
                          dateRange === range 
                            ? "bg-pink-600 text-white" 
                            : "text-pink-950 dark:text-pink-100 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                        )}
                        onClick={() => {
                          setDateRange(range)
                          setShowDatePicker(false)
                        }}
                      >
                        {range}
                      </button>
                    )
                  )}
                  <div className="border-t border-pink-200 dark:border-pink-800 my-1"></div>
                  <button
                    className="block w-full px-4 py-2 text-left text-sm text-pink-950 dark:text-pink-100 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                    onClick={() => setShowDatePicker(false)}
                  >
                    Custom Range...
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Export Options */}
          <div className="relative">
            <button
              onClick={() => setShowExportOptions(!showExportOptions)}
              className="inline-flex items-center justify-center rounded-md border border-pink-200 dark:border-pink-800 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium shadow-sm hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </button>
            {showExportOptions && (
              <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-pink-200 dark:border-pink-800 bg-white dark:bg-gray-800 shadow-lg">
                <div className="py-1">
                  <button
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-pink-50 dark:hover:bg-pink-900/20"
                    onClick={() => handleExport('csv')}
                  >
                    Export as CSV
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-pink-50 dark:hover:bg-pink-900/20"
                    onClick={() => handleExport('pdf')}
                  >
                    Export as PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Tabs */}
      <div className="flex border-b border-pink-200 dark:border-pink-800 bg-white dark:bg-gray-800 rounded-t-lg">
        <button
          className={cn(
            "px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors flex items-center",
            activeTab === "sales"
              ? "border-pink-600 text-pink-600"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          )}
          onClick={() => setActiveTab("sales")}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Sales Overview
        </button>
        <button
          className={cn(
            "px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors flex items-center",
            activeTab === "customers"
              ? "border-pink-600 text-pink-600"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          )}
          onClick={() => setActiveTab("customers")}
        >
          <Users className="mr-2 h-4 w-4" />
          Customer Analytics
        </button>
        <button
          className={cn(
            "px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors flex items-center",
            activeTab === "inventory"
              ? "border-pink-600 text-pink-600"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          )}
          onClick={() => setActiveTab("inventory")}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Inventory Analysis
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-pink-100 dark:border-pink-800 p-6">
        {activeTab === "sales" && (
          <div className="space-y-6">
            {/* Time Range Selector */}
            <div className="flex space-x-2">
              {["daily", "weekly", "monthly"].map((range) => (
                <button
                  key={range}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    timeRange === range
                      ? "bg-pink-600 text-white"
                      : "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-900/40"
                  )}
                  onClick={() => setTimeRange(range)}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>

            {/* Sales Chart */}
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timeRange === "daily" ? dailySalesData : timeRange === "weekly" ? weeklySalesData : monthlySalesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#ec4899" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Category Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name} (${value}%)`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Growth Trends</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklySalesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#ec4899" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "customers" && (
          <div className="space-y-6">
            {/* Customer analytics content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-pink-600">Repeat Buyers</h4>
                <p className="text-2xl font-bold">{customerData.repeatBuyers}%</p>
              </div>
              <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-pink-600">New Customers</h4>
                <p className="text-2xl font-bold">{customerData.newCustomers}%</p>
              </div>
            </div>
            
            {/* Demographics Chart */}
            <div className="h-[300px]">
              <h3 className="text-lg font-semibold mb-4">Customer Demographics</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerData.demographics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "inventory" && (
          <div className="space-y-6">
            {/* Inventory analysis content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Inventory Turnover</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={inventoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="product" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="turnover" fill="#ec4899" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Current Stock Levels</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={inventoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="product" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="stock" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
