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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Sales Analysis</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-muted"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {dateRange}
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            {showDatePicker && (
              <div className="absolute right-0 z-10 mt-2 w-56 rounded-md border border-border bg-background shadow-lg">
                <div className="py-1">
                  {["Today", "Yesterday", "This Week", "Last Week", "This Month", "Last Month", "This Year"].map(
                    (range) => (
                      <button
                        key={range}
                        className={cn(
                          "block w-full px-4 py-2 text-left text-sm",
                          dateRange === range ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                        )}
                        onClick={() => {
                          setDateRange(range)
                          setShowDatePicker(false)
                        }}
                      >
                        {range}
                      </button>
                    ),
                  )}
                  <div className="border-t border-border my-1"></div>
                  <button
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-muted"
                    onClick={() => {
                      // In a real app, this would open a date range picker
                      setShowDatePicker(false)
                    }}
                  >
                    Custom Range...
                  </button>
                </div>
              </div>
            )}
          </div>
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-muted">
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Time Range Tabs */}
      <div className="flex border-b border-border">
        <button
          className={cn(
            "px-4 py-2 text-sm font-medium border-b-2 -mb-px",
            timeRange === "daily"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setTimeRange("daily")}
        >
          Daily
        </button>
        <button
          className={cn(
            "px-4 py-2 text-sm font-medium border-b-2 -mb-px",
            timeRange === "weekly"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setTimeRange("weekly")}
        >
          Weekly
        </button>
        <button
          className={cn(
            "px-4 py-2 text-sm font-medium border-b-2 -mb-px",
            timeRange === "monthly"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setTimeRange("monthly")}
        >
          Monthly
        </button>
      </div>

      {/* Sales Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Total Sales</p>
              <h3 className="text-2xl font-bold mt-1">₹{totalSales.toLocaleString()}</h3>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">For the selected period</div>
        </div>

        <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Average Sales</p>
              <h3 className="text-2xl font-bold mt-1">₹{Math.round(averageSales).toLocaleString()}</h3>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            Per {timeRange === "daily" ? "day" : timeRange === "weekly" ? "week" : "month"}
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Highest Sales</p>
              <h3 className="text-2xl font-bold mt-1">₹{highestSales.toLocaleString()}</h3>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">Peak performance</div>
        </div>

        <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Lowest Sales</p>
              <h3 className="text-2xl font-bold mt-1">₹{lowestSales.toLocaleString()}</h3>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">Minimum performance</div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold">Sales Trend</h3>
          <div className="flex items-center space-x-2">
            <select
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {timeRange === "monthly" ? (
              <BarChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    borderRadius: "0.5rem",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                  }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, "Sales"]}
                />
                <Bar dataKey="sales" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    borderRadius: "0.5rem",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                  }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, "Sales"]}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
          <h3 className="font-semibold mb-6">Sales by Category</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    borderRadius: "0.5rem",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                  }}
                  formatter={(value) => [`${value}%`, "Percentage"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
          <h3 className="font-semibold mb-6">Sales Summary</h3>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="p-2 bg-green-500/10 rounded-full mr-4">
                <Info className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Performance Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  {timeRange === "daily"
                    ? "Your daily sales show a positive trend with an average increase of 8.2% compared to last week. Weekend sales are particularly strong."
                    : timeRange === "weekly"
                      ? "Weekly sales have been consistent with a slight upward trend. Week 4 shows the highest performance with a 9.4% increase over Week 3."
                      : "Monthly sales have grown steadily throughout the year with a notable 20% increase in Q4 compared to Q3. December shows the highest sales volume."}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-2 bg-blue-500/10 rounded-full mr-4">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Category Insights</h4>
                <p className="text-sm text-muted-foreground">
                  Electronics continues to be your top-performing category at 35% of total sales, followed by Clothing
                  at 25%. Consider expanding your Home category which shows growing demand.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-2 bg-purple-500/10 rounded-full mr-4">
                <Info className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Recommendations</h4>
                <p className="text-sm text-muted-foreground">
                  Based on current trends, consider running promotions during lower-performing periods. Increasing
                  inventory for top-selling categories before peak seasons could further boost sales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
