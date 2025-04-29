"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const productPerformanceData = [
  { name: "Organic Cotton Pads", views: 1200, sales: 450, revenue: 8900 },
  { name: "Biodegradable Liners", views: 800, sales: 320, revenue: 6400 },
  { name: "Menstrual Cup", views: 600, sales: 150, revenue: 5900 },
  { name: "Herbal Pads", views: 900, sales: 280, revenue: 5600 },
  { name: "Eco Tampons", views: 700, sales: 200, revenue: 4000 },
]

const categoryDistribution = [
  { name: "Pads", value: 45 },
  { name: "Liners", value: 25 },
  { name: "Cups", value: 15 },
  { name: "Tampons", value: 15 },
]

const COLORS = ["#FF8042", "#00C49F", "#FFBB28", "#0088FE"]

export default function ProductAnalysisPage() {
  const [activeMetric, setActiveMetric] = useState("views")

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-pink-950 dark:text-pink-50">Product Analysis</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Performance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Product Performance</h2>
          <div className="flex space-x-2 mb-4">
            {["views", "sales", "revenue"].map((metric) => (
              <button
                key={metric}
                onClick={() => setActiveMetric(metric)}
                className={`px-3 py-1 rounded-md text-sm ${
                  activeMetric === metric
                    ? "bg-pink-600 text-white"
                    : "bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400"
                }`}
              >
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </button>
            ))}
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey={activeMetric} fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Product Metrics Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-pink-200 dark:divide-pink-800">
          <thead className="bg-pink-50 dark:bg-pink-900/20">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-600 dark:text-pink-400 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-600 dark:text-pink-400 uppercase tracking-wider">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-600 dark:text-pink-400 uppercase tracking-wider">Sales</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-600 dark:text-pink-400 uppercase tracking-wider">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pink-200 dark:divide-pink-800">
            {productPerformanceData.map((product) => (
              <tr key={product.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{product.views}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{product.sales}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">₹{product.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}