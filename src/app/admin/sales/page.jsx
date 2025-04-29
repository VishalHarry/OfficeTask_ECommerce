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
} from "recharts"
import { Calendar, ChevronDown, Download, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample data for charts
const dailySalesData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 4500 },
  { name: "Fri", sales: 6000 },
  { name: "Sat", sales: 5500 },
  { name: "Sun", sales: 7000 },
]

const weeklySalesData = [
  { name: "Week 1", sales: 25000 },
  { name: "Week 2", sales: 32000 },
  { name: "Week 3", sales: 28000 },
  { name: "Week 4", sales: 35000 },
]

const monthlySalesData = [
  { name: "Jan", sales: 95000 },
  { name: "Feb", sales: 85000 },
  { name: "Mar", sales: 110000 },
  { name: "Apr", sales: 105000 },
  { name: "May", sales: 120000 },
  { name: "Jun", sales: 130000 },
  { name: "Jul", sales: 125000 },
  { name: "Aug", sales: 140000 },
  { name: "Sep", sales: 135000 },
  { name: "Oct", sales: 150000 },
  { name: "Nov", sales: 160000 },
  { name: "Dec", sales: 180000 },
]

const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Home", value: 20 },
  { name: "Beauty", value: 15 },
  { name: "Other", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function SalesAnalysisPage() {
  const [timeRange, setTimeRange] = useState("daily")
  const [dateRange, setDateRange] = useState("This Week")
  const [showDatePicker, setShowDatePicker] = useState(false)

  // Get the appropriate data based on the selected time range
  const getChartData = () => {
    switch (timeRange) {
      case "daily":
        return dailySalesData
      case "weekly":
        return weeklySalesData
      case "monthly":
        return monthlySalesData
      default:
        return dailySalesData
    }
  }

  // Calculate total sales
  const totalSales = getChartData().reduce((sum, item) => sum + item.sales, 0)

  // Calculate average sales
  const averageSales = totalSales / getChartData().length

  // Find highest and lowest sales
  const highestSales = Math.max(...getChartData().map((item) => item.sales))
  const lowestSales = Math.min(...getChartData().map((item) => item.sales))

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-pink-100 dark:border-pink-800">
        <h1 className="text-2xl font-bold text-pink-950 dark:text-pink-100">Sales Analysis</h1>
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
          <button className="inline-flex items-center justify-center rounded-md border border-pink-200 dark:border-pink-800 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium shadow-sm hover:bg-pink-50 dark:hover:bg-pink-900/20 text-pink-950 dark:text-pink-100 transition-colors">
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Time Range Tabs */}
      <div className="flex border-b border-pink-200 dark:border-pink-800 bg-white dark:bg-gray-800 rounded-t-lg">
        <button
          className={cn(
            "px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
            timeRange === "daily"
              ? "border-pink-600 text-pink-600 dark:text-pink-400"
              : "border-transparent text-pink-600/70 dark:text-pink-400/70 hover:text-pink-950 dark:hover:text-pink-100"
          )}
          onClick={() => setTimeRange("daily")}
        >
          Daily
        </button>
        <button
          className={cn(
            "px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
            timeRange === "weekly"
              ? "border-pink-600 text-pink-600 dark:text-pink-400"
              : "border-transparent text-pink-600/70 dark:text-pink-400/70 hover:text-pink-950 dark:hover:text-pink-100"
          )}
          onClick={() => setTimeRange("weekly")}
        >
          Weekly
        </button>
        <button
          className={cn(
            "px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
            timeRange === "monthly"
              ? "border-pink-600 text-pink-600 dark:text-pink-400"
              : "border-transparent text-pink-600/70 dark:text-pink-400/70 hover:text-pink-950 dark:hover:text-pink-100"
          )}
          onClick={() => setTimeRange("monthly")}
        >
          Monthly
        </button>
      </div>

      {/* Sales Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-800 rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-pink-600/70 dark:text-pink-400/70">Total Sales</p>
              <h3 className="text-2xl font-bold mt-1 text-pink-950 dark:text-pink-100">₹{totalSales.toLocaleString()}</h3>
            </div>
          </div>
          <div className="mt-4 text-xs text-pink-600/70 dark:text-pink-400/70">For the selected period</div>
        </div>

        {/* Add similar styling to other cards */}
        <div className="bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-800 rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground text-pink-600/70 dark:text-pink-400/70">Average Sales</p>
              <h3 className="text-2xl font-bold mt-1">₹{Math.round(averageSales).toLocaleString()}</h3>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground text-pink-600/70 dark:text-pink-400/70 ">
            Per {timeRange === "daily" ? "day" : timeRange === "weekly" ? "week" : "month"}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-800 rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground text-pink-600/70 dark:text-pink-400/70">Highest Sales</p>
              <h3 className="text-2xl font-bold mt-1">₹{highestSales.toLocaleString()}</h3>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground text-pink-600/70 dark:text-pink-400/70">Peak performance</div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-800 rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground text-pink-600/70 dark:text-pink-400/70">Lowest Sales</p>
              <h3 className="text-2xl font-bold mt-1">₹{lowestSales.toLocaleString()}</h3>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground text-pink-600/70 dark:text-pink-400/70">Minimum performance</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-pink-950 dark:text-pink-100">Sales Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line type="monotone" dataKey="sales" stroke="#ec4899" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-pink-950 dark:text-pink-100">Category Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#ec4899"
                  dataKey="value"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
