"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import FilterSidebar from "./FilterSidebar"


export default function MobileFilterDrawer({ isOpen, onClose, filters, onFilterChange, onReset }) {
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling when drawer is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 lg:hidden animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div
        className="absolute right-0 top-0 h-full w-[85%] max-w-md bg-background shadow-xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 64px)" }}>
          <FilterSidebar filters={filters} onFilterChange={onFilterChange} onReset={onReset} />
        </div>
      </div>
    </div>
  )
}
