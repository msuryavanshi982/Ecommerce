"use client"

import { useState } from "react"
import type { Product } from "@/types"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface ProductVariantSelectorProps {
  product: Product
}

export function ProductVariantSelector({ product }: ProductVariantSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.value || "")
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.value || "")

  return (
    <div className="space-y-4">
      {product.colors && product.colors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Color</h3>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color.value}
                type="button"
                className={`relative h-8 w-8 rounded-full border ${
                  selectedColor === color.value ? "ring-2 ring-primary ring-offset-2" : "ring-0"
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(color.value)}
                aria-label={color.name}
              >
                <span className="sr-only">{color.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {product.sizes && product.sizes.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Size</h3>
          <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <div key={size.value} className="flex items-center">
                <RadioGroupItem value={size.value} id={`size-${size.value}`} className="peer sr-only" />
                <Label
                  htmlFor={`size-${size.value}`}
                  className="flex h-9 w-9 items-center justify-center rounded-md border peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                >
                  {size.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    </div>
  )
}
