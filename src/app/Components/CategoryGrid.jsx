"use client"

import { useState } from "react"
import Link from "next/link"
import { Shirt, Watch, Headphones, Laptop, Home, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  {
    name: "Fashion",
    icon: Shirt,
    color: "bg-pink-100 dark:bg-pink-900/20",
    textColor: "text-pink-600 dark:text-pink-400",
    href: "/shop/fashion",
  },
  {
    name: "Electronics",
    icon: Laptop,
    color: "bg-blue-100 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
    href: "/shop/electronics",
  },
  {
    name: "Audio",
    icon: Headphones,
    color: "bg-purple-100 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
    href: "/shop/audio",
  },
  {
    name: "Accessories",
    icon: Watch,
    color: "bg-amber-100 dark:bg-amber-900/20",
    textColor: "text-amber-600 dark:text-amber-400",
    href: "/shop/accessories",
  },
  {
    name: "Home & Living",
    icon: Home,
    color: "bg-green-100 dark:bg-green-900/20",
    textColor: "text-green-600 dark:text-green-400",
    href: "/shop/home-living",
  },
  {
    name: "All Products",
    icon: ShoppingBag,
    color: "bg-gray-100 dark:bg-gray-800/40",
    textColor: "text-gray-600 dark:text-gray-400",
    href: "/shop",
  },
]

export default function CategoryGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
          <p className="text-muted-foreground mt-1">Find exactly what you&apos;re looking for</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => {
          const Icon = category.icon

          return (
            <Link
              key={index}
              href={category.href}
              className={cn(
                "flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-300 border border-transparent",
                category.color,
                hoveredIndex === index && "transform -translate-y-1 shadow-lg border-primary/20",
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={cn(
                  "rounded-full p-3 mb-3",
                  hoveredIndex === index ? "bg-white/80 dark:bg-black/20" : "bg-white/50 dark:bg-black/10",
                )}
              >
                <Icon className={cn("h-8 w-8", category.textColor)} />
              </div>
              <span className="font-medium text-center">{category.name}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
