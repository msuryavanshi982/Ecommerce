import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getOrderById, updateOrderStatus } from "@/lib/data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated
  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    })
  }

  const order = await getOrderById(params.id)

  // Check if order exists
  if (!order) {
    return new NextResponse(JSON.stringify({ error: "Order not found" }), {
      status: 404,
    })
  }

  // Check if user has access to this order
  if (
    session.user.role !== "admin" &&
    order.userId !== session.user.id &&
    session.user.role === "rider" &&
    order.riderId !== session.user.id
  ) {
    return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
    })
  }

  return NextResponse.json(order)
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated
  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    })
  }

  try {
    const body = await request.json()
    const { status, riderId } = body

    // Validate user permissions for status update
    if (session.user.role === "admin") {
      // Admin can update any status and assign riders
      const updatedOrder = await updateOrderStatus(params.id, status, riderId)
      return NextResponse.json(updatedOrder)
    } else if (session.user.role === "rider") {
      // Rider can only update status to "Delivered" or "Undelivered"
      if (status !== "Delivered" && status !== "Undelivered") {
        return new NextResponse(JSON.stringify({ error: "Forbidden status update" }), {
          status: 403,
        })
      }

      const order = await getOrderById(params.id)

      // Check if rider is assigned to this order
      if (order?.riderId !== session.user.id) {
        return new NextResponse(JSON.stringify({ error: "Not assigned to this order" }), {
          status: 403,
        })
      }

      const updatedOrder = await updateOrderStatus(params.id, status)
      return NextResponse.json(updatedOrder)
    }

    return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to update order" }), {
      status: 500,
    })
  }
}
