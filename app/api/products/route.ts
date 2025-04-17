import { NextResponse } from "next/server"
import { getProducts } from "@/lib/data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const color = searchParams.get("color")
  const size = searchParams.get("size")
  const sort = searchParams.get("sort")
  const page = searchParams.get("page")

  const products = await getProducts({
    category: category || undefined,
    color: color || undefined,
    size: size || undefined,
    sort: sort || undefined,
    page: page || undefined,
  })

  return NextResponse.json(products)
}
