"use client"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, RotateCcw } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const categories = [
  { id: "clothing", label: "Clothing" },
  { id: "electronics", label: "Electronics" },
  { id: "furniture", label: "Furniture" },
  { id: "books", label: "Books" },
  { id: "beauty", label: "Beauty & Personal Care" },
]

const tags = [
  { id: "new", label: "New" },
  { id: "bestseller", label: "Bestseller" },
  { id: "clearance", label: "Clearance" },
  { id: "limited", label: "Limited Edition" },
  { id: "sale", label: "Sale" },
]

export default function FilterSidebar({ filters, onFilterChange, onReset }) {
  const formatPrice = (value) => `₹${value.toLocaleString()}`

  const handleCategoryChange = (categoryId) => {
    const updatedCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId]

    onFilterChange({ categories: updatedCategories })
  }

  const handlePriceChange = (values) => {
    onFilterChange({ priceRange: values })
  }

  const handleRatingChange = (rating) => {
    onFilterChange({ ratings: filters.ratings === rating ? 0 : rating })
  }

  const handleInStockChange = (checked) => {
    onFilterChange({ inStockOnly: checked })
  }

  const handleTagChange = (tagId) => {
    const updatedTags = filters.tags.includes(tagId)
      ? filters.tags.filter((id) => id !== tagId)
      : [...filters.tags, tagId]

    onFilterChange({ tags: updatedTags })
  }

  return (
    <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <RotateCcw size={14} />
          Reset All
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["categories", "price", "ratings", "availability", "tags"]}
        className="space-y-4"
      >
        <AccordionItem value="categories" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="text-base font-medium">Categories</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="text-base font-medium">Price Range</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-1">
              <Slider
                defaultValue={[100, 10000]}
                value={filters.priceRange}
                min={100}
                max={10000}
                step={100}
                onValueChange={handlePriceChange}
                className="py-4"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{formatPrice(filters.priceRange[0])}</span>
                <span className="text-sm font-medium">{formatPrice(filters.priceRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ratings" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="text-base font-medium">Ratings</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div
                  key={rating}
                  className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors ${
                    filters.ratings === rating ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                  onClick={() => handleRatingChange(rating)}
                >
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                  </div>
                  <span className="text-sm font-medium">& Up</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="text-base font-medium">Availability</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2 pt-1">
              <Switch id="in-stock" checked={filters.inStockOnly} onCheckedChange={handleInStockChange} />
              <label
                htmlFor="in-stock"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                In Stock Only
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tags" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="text-base font-medium">Tags</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant={filters.tags.includes(tag.id) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    filters.tags.includes(tag.id) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                  onClick={() => handleTagChange(tag.id)}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
