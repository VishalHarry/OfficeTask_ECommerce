"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SortBar({ totalResults, sortOption, onSortChange }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="text-pink-600">
        <span className="font-medium text-pink-950">{totalResults}</span> results found
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <span className="text-sm text-pink-600 whitespace-nowrap">Sort by:</span>
        <Select value={sortOption} onValueChange={onSortChange}>
          <SelectTrigger className="w-full sm:w-[180px] border-pink-200 focus:ring-pink-200">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            <SelectItem value="new-arrivals">New Arrivals</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
