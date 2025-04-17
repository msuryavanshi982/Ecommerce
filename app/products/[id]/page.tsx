import { getProductById, getRelatedProducts } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import { ProductVariantSelector } from "@/components/product-variant-selector"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"
import { Suspense } from "react"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
        {/* Product Images */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
            <Image
              src={product.images[0] || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(0, 4).map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-md border bg-muted">
                <Image
                  src={image || "/placeholder.svg?height=100&width=100"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl font-semibold mt-2">${product.price.toFixed(2)}</p>
            <div className="flex items-center gap-1 mt-1">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              <span className="text-sm text-muted-foreground ml-1">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4 mt-4">
            <ProductVariantSelector product={product} />
            <AddToCartButton product={product} />
          </div>

          <div className="mt-6">
            <Tabs defaultValue="description">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">
                  Description
                </TabsTrigger>
                <TabsTrigger value="specifications" className="flex-1">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">
                  Reviews
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <div className="prose max-w-none">
                  <p>{product.fullDescription || product.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="mt-4">
                <div className="grid grid-cols-2 gap-2">
                  {product.specifications?.map((spec, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-sm font-medium">{spec.name}</span>
                      <span className="text-sm text-muted-foreground">{spec.value}</span>
                    </div>
                  )) || <p className="text-muted-foreground">No specifications available for this product.</p>}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <div className="space-y-4">
                  {product.reviews?.map((review, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex items-center gap-1">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                      </div>
                      <h4 className="font-medium mt-1">{review.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{review.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        By {review.author} on {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  )) || <p className="text-muted-foreground">No reviews available for this product.</p>}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <Suspense fallback={<div>Loading related products...</div>}>
          <RelatedProducts productId={product.id} />
        </Suspense>
      </div>
    </div>
  )
}

async function RelatedProducts({ productId }: { productId: string }) {
  const relatedProducts = await getRelatedProducts(productId)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
