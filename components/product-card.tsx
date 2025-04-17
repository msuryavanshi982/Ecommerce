import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/types"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/products/${product.id}`} className="relative block h-64 overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          fill
          className="object-contain transition-transform hover:scale-105"
        />
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
            New
          </div>
        )}
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
      </Link>
      <CardContent className="p-4">
        <div className="space-y-1">
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-semibold">${product.price.toFixed(2)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link href={`/products/${product.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Button size="icon" variant="secondary">
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
