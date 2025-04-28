"use client"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { RotateCcw, Droplets, Moon, Ruler, Leaf, Tag } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FilterSidebar({ filters, onFilterChange, onReset }) {
  const formatPrice = (value) => `₹${value.toLocaleString()}`

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-pink-100 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-pink-950">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 flex items-center gap-1"
        >
          <RotateCcw size={14} />
          Clear All
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["price", "type", "absorption", "size", "material", "offers"]}
        className="space-y-4"
      >
        <AccordionItem value="price" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="text-base font-medium text-pink-950">Price Range</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-1">
              <Slider
                defaultValue={[100, 1000]}
                value={filters.priceRange}
                min={0}
                max={1000}
                step={10}
                onValueChange={(values) => onFilterChange({ priceRange: values })}
                className="py-4"
              />
              <div className="flex items-center justify-between text-pink-950">
                <span className="text-sm font-medium">{formatPrice(filters.priceRange[0])}</span>
                <span className="text-sm font-medium">{formatPrice(filters.priceRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="type" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline">
            <div className="flex items-center gap-2 text-pink-950">
              <Droplets size={18} className="text-pink-400" />
              <span className="text-base font-medium">Pad Type</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {["Regular Pads", "Overnight Pads", "Extra Long Pads", "Organic Pads"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.types?.includes(type)}
                    onCheckedChange={(checked) => {
                      const newTypes = checked
                        ? [...(filters.types || []), type]
                        : filters.types?.filter((t) => t !== type)
                      onFilterChange({ types: newTypes })
                    }}
                    className="border-pink-200 text-pink-600 data-[state=checked]:bg-pink-600"
                  />
                  <label
                    htmlFor={`type-${type}`}
                    className="text-sm font-medium text-pink-950 cursor-pointer"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="absorption" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline">
            <div className="flex items-center gap-2 text-pink-950">
              <Moon size={18} className="text-pink-400" />
              <span className="text-base font-medium">Absorption Level</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {["Light Flow", "Medium Flow", "Heavy Flow"].map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={`absorption-${level}`}
                    checked={filters.absorption?.includes(level)}
                    onCheckedChange={(checked) => {
                      const newLevels = checked
                        ? [...(filters.absorption || []), level]
                        : filters.absorption?.filter((l) => l !== level)
                      onFilterChange({ absorption: newLevels })
                    }}
                    className="border-pink-200 text-pink-600 data-[state=checked]:bg-pink-600"
                  />
                  <label
                    htmlFor={`absorption-${level}`}
                    className="text-sm font-medium text-pink-950 cursor-pointer"
                  >
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline">
            <div className="flex items-center gap-2 text-pink-950">
              <Ruler size={18} className="text-pink-400" />
              <span className="text-base font-medium">Size</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {["Small (S)", "Medium (M)", "Large (L)", "Extra Large (XL)"].map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={filters.sizes?.includes(size)}
                    onCheckedChange={(checked) => {
                      const newSizes = checked
                        ? [...(filters.sizes || []), size]
                        : filters.sizes?.filter((s) => s !== size)
                      onFilterChange({ sizes: newSizes })
                    }}
                    className="border-pink-200 text-pink-600 data-[state=checked]:bg-pink-600"
                  />
                  <label
                    htmlFor={`size-${size}`}
                    className="text-sm font-medium text-pink-950 cursor-pointer"
                  >
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="material" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline">
            <div className="flex items-center gap-2 text-pink-950">
              <Leaf size={18} className="text-pink-400" />
              <span className="text-base font-medium">Material</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {["Organic Cotton", "Plant-Based", "Biodegradable"].map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox
                    id={`material-${material}`}
                    checked={filters.materials?.includes(material)}
                    onCheckedChange={(checked) => {
                      const newMaterials = checked
                        ? [...(filters.materials || []), material]
                        : filters.materials?.filter((m) => m !== material)
                      onFilterChange({ materials: newMaterials })
                    }}
                    className="border-pink-200 text-pink-600 data-[state=checked]:bg-pink-600"
                  />
                  <label
                    htmlFor={`material-${material}`}
                    className="text-sm font-medium text-pink-950 cursor-pointer"
                  >
                    {material}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="offers" className="border-b-0">
          <AccordionTrigger className="py-3 hover:no-underline">
            <div className="flex items-center gap-2 text-pink-950">
              <Tag size={18} className="text-pink-400" />
              <span className="text-base font-medium">Offers</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="discounted"
                  checked={filters.showDiscounted}
                  onCheckedChange={(checked) => onFilterChange({ showDiscounted: checked })}
                  className="border-pink-200 text-pink-600 data-[state=checked]:bg-pink-600"
                />
                <label
                  htmlFor="discounted"
                  className="text-sm font-medium text-pink-950 cursor-pointer"
                >
                  Show only discounted products
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
