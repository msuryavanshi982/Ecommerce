import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { createOrder, getOrders } from "@/lib/data"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated
  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const userId = session.user.id
  const role = session.user.role

  // Get orders based on user role
  const orders = await getOrders({
    userId,
    role,
    status: status || undefined,
  })

  return NextResponse.json(orders)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated
  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    })
  }

  try {
    const body = await request.json()
    const { items, shippingAddress, paymentMethod } = body

    const order = await createOrder({
      userId: session.user.id,
      items,
      shippingAddress,
      paymentMethod,
    })

    return NextResponse.json(order)
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to create order" }), {
      status: 500,
    })
  }
}
