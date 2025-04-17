"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.get("category")?.split(",") || [])
  const [selectedColors, setSelectedColors] = useState<string[]>(searchParams.get("color")?.split(",") || [])
  const [selectedSizes, setSelectedSizes] = useState<string[]>(searchParams.get("size")?.split(",") || [])

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(
      checked ? [...selectedCategories, category] : selectedCategories.filter((c) => c !== category),
    )
  }

  const handleColorChange = (color: string, checked: boolean) => {
    setSelectedColors(checked ? [...selectedColors, color] : selectedColors.filter((c) => c !== color))
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    setSelectedSizes(checked ? [...selectedSizes, size] : selectedSizes.filter((s) => s !== size))
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","))
    } else {
      params.delete("category")
    }

    if (selectedColors.length > 0) {
      params.set("color", selectedColors.join(","))
    } else {
      params.delete("color")
    }

    if (selectedSizes.length > 0) {
      params.set("size", selectedSizes.join(","))
    } else {
      params.delete("size")
    }

    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    router.push(`/products?${params.toString()}`)
  }

  const resetFilters = () => {
    setPriceRange([0, 1000])
    setSelectedCategories([])
    setSelectedColors([])
    setSelectedSizes([])
    router.push("/products")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <Button variant="outline" size="sm" onClick={resetFilters} className="w-full">
          Reset Filters
        </Button>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Categories</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="category-fans"
              checked={selectedCategories.includes("fans")}
              onCheckedChange={(checked) => handleCategoryChange("fans", checked as boolean)}
            />
            <label htmlFor="category-fans" className="text-sm">
              Fans
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="category-ceiling-fans"
              checked={selectedCategories.includes("ceiling-fans")}
              onCheckedChange={(checked) => handleCategoryChange("ceiling-fans", checked as boolean)}
            />
            <label htmlFor="category-ceiling-fans" className="text-sm">
              Ceiling Fans
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="category-table-fans"
              checked={selectedCategories.includes("table-fans")}
              onCheckedChange={(checked) => handleCategoryChange("table-fans", checked as boolean)}
            />
            <label htmlFor="category-table-fans" className="text-sm">
              Table Fans
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="category-air-conditioners"
              checked={selectedCategories.includes("air-conditioners")}
              onCheckedChange={(checked) => handleCategoryChange("air-conditioners", checked as boolean)}
            />
            <label htmlFor="category-air-conditioners" className="text-sm">
              Air Conditioners
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="category-split-ac"
              checked={selectedCategories.includes("split-ac")}
              onCheckedChange={(checked) => handleCategoryChange("split-ac", checked as boolean)}
            />
            <label htmlFor="category-split-ac" className="text-sm">
              Split AC
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="category-window-ac"
              checked={selectedCategories.includes("window-ac")}
              onCheckedChange={(checked) => handleCategoryChange("window-ac", checked as boolean)}
            />
            <label htmlFor="category-window-ac" className="text-sm">
              Window AC
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Price Range</h4>
        <Slider defaultValue={priceRange} max={1000} step={10} value={priceRange} onValueChange={setPriceRange} />
        <div className="flex items-center justify-between">
          <span className="text-sm">${priceRange[0]}</span>
          <span className="text-sm">${priceRange[1]}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Colors</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="color-white"
              checked={selectedColors.includes("white")}
              onCheckedChange={(checked) => handleColorChange("white", checked as boolean)}
            />
            <label htmlFor="color-white" className="text-sm flex items-center">
              <span className="h-4 w-4 rounded-full bg-white border mr-2"></span>
              White
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="color-black"
              checked={selectedColors.includes("black")}
              onCheckedChange={(checked) => handleColorChange("black", checked as boolean)}
            />
            <label htmlFor="color-black" className="text-sm flex items-center">
              <span className="h-4 w-4 rounded-full bg-black mr-2"></span>
              Black
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="color-silver"
              checked={selectedColors.includes("silver")}
              onCheckedChange={(checked) => handleColorChange("silver", checked as boolean)}
            />
            <label htmlFor="color-silver" className="text-sm flex items-center">
              <span className="h-4 w-4 rounded-full bg-gray-300 mr-2"></span>
              Silver
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="color-blue"
              checked={selectedColors.includes("blue")}
              onCheckedChange={(checked) => handleColorChange("blue", checked as boolean)}
            />
            <label htmlFor="color-blue" className="text-sm flex items-center">
              <span className="h-4 w-4 rounded-full bg-blue-500 mr-2"></span>
              Blue
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Sizes</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="size-small"
              checked={selectedSizes.includes("small")}
              onCheckedChange={(checked) => handleSizeChange("small", checked as boolean)}
            />
            <label htmlFor="size-small" className="text-sm">
              Small
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="size-medium"
              checked={selectedSizes.includes("medium")}
              onCheckedChange={(checked) => handleSizeChange("medium", checked as boolean)}
            />
            <label htmlFor="size-medium" className="text-sm">
              Medium
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="size-large"
              checked={selectedSizes.includes("large")}
              onCheckedChange={(checked) => handleSizeChange("large", checked as boolean)}
            />
            <label htmlFor="size-large" className="text-sm">
              Large
            </label>
          </div>
        </div>
      </div>

      <Button onClick={applyFilters} className="w-full">
        Apply Filters
      </Button>
    </div>
  )
}
