"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/types"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.value || "")
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.value || "")
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      selectedColor,
      selectedSize,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-md"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          -
        </Button>
        <div className="w-12 text-center">{quantity}</div>
        <Button variant="outline" size="icon" className="h-9 w-9 rounded-md" onClick={() => setQuantity(quantity + 1)}>
          +
        </Button>
      </div>
      <Button onClick={handleAddToCart} className="w-full">
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  )
}
