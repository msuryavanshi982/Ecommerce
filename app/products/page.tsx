import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { getProducts } from "@/lib/data"
import { Suspense } from "react"
import { ProductsLoading } from "@/components/products-loading"

interface ProductsPageProps {
  searchParams: {
    category?: string
    color?: string
    size?: string
    sort?: string
    page?: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 shrink-0">
          <ProductFilters />
        </aside>
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Products</h1>
              <div className="flex items-center gap-2">
                <select
                  className="h-9 w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                  defaultValue={searchParams.sort || "newest"}
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to high</option>
                  <option value="price-desc">Price: High to low</option>
                  <option value="rating">Top rated</option>
                </select>
              </div>
            </div>
            <Suspense fallback={<ProductsLoading />}>
              <ProductsList searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

async function ProductsList({ searchParams }: ProductsPageProps) {
  const products = await getProducts(searchParams)

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-xl font-semibold">No products found</h2>
        <p className="text-muted-foreground">Try adjusting your filters or search term</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
