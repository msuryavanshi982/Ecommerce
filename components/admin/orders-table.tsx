"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import type { Order, OrderStatus, Rider } from "@/types"
import { MoreHorizontal, Truck } from "lucide-react"
import { useEffect, useState } from "react"

interface AdminOrdersTableProps {
  status?: OrderStatus | "all"
  limit?: number
}

export default function AdminOrdersTable({ status = "all", limit }: AdminOrdersTableProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [riders, setRiders] = useState<Rider[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [selectedRider, setSelectedRider] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Fetch orders
    const fetchOrders = async () => {
      try {
        setLoading(true)
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        const mockOrders: Order[] = Array(10)
          .fill(null)
          .map((_, index) => ({
            id: `ORD-${100000 + index}`,
            userId: `user-${index}`,
            customerName: `Customer ${index + 1}`,
            customerEmail: `customer${index + 1}@example.com`,
            customerPhone: `+1 555-${100 + index}`,
            items: [
              {
                id: `prod-${index}-1`,
                name: "Premium Ceiling Fan",
                price: 129.99,
                quantity: 1,
                selectedColor: "white",
                selectedSize: "large",
                image: "/placeholder.svg?height=64&width=64",
              },
              {
                id: `prod-${index}-2`,
                name: "Smart Air Conditioner",
                price: 349.99,
                quantity: 1,
                selectedColor: "silver",
                selectedSize: "medium",
                image: "/placeholder.svg?height=64&width=64",
              },
            ],
            total: 479.98,
            status: ["Paid", "Shipped", "Delivered", "Undelivered"][Math.floor(Math.random() * 4)] as OrderStatus,
            shippingAddress: {
              street: `${1000 + index} Main St`,
              city: "Anytown",
              state: "CA",
              zipCode: "12345",
              country: "USA",
            },
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
            riderId: Math.random() > 0.5 ? `rider-${Math.floor(Math.random() * 5)}` : null,
          }))

        // Filter by status if provided
        const filteredOrders = status === "all" ? mockOrders : mockOrders.filter((order) => order.status === status)

        // Apply limit if provided
        const limitedOrders = limit ? filteredOrders.slice(0, limit) : filteredOrders

        setOrders(limitedOrders)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch orders:", error)
        setLoading(false)
      }
    }

    // Fetch riders
    const fetchRiders = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        const mockRiders: Rider[] = Array(5)
          .fill(null)
          .map((_, index) => ({
            id: `rider-${index}`,
            name: `Rider ${index + 1}`,
            email: `rider${index + 1}@example.com`,
            phone: `+1 555-${200 + index}`,
            status: Math.random() > 0.3 ? "available" : "busy",
            assignedOrders: Math.floor(Math.random() * 5),
          }))

        setRiders(mockRiders)
      } catch (error) {
        console.error("Failed to fetch riders:", error)
      }
    }

    fetchOrders()
    fetchRiders()
  }, [status, limit])

  const handleShipOrder = (order: Order) => {
    setSelectedOrder(order)
    setSelectedRider("")
    setIsDialogOpen(true)
  }

  const handleConfirmShipment = async () => {
    if (!selectedOrder || !selectedRider) {
      toast({
        title: "Error",
        description: "Please select a rider to assign the order.",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll update the state directly
      setOrders(
        orders.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: "Shipped", riderId: selectedRider, updatedAt: new Date().toISOString() }
            : order,
        ),
      )

      toast({
        title: "Order shipped",
        description: `Order ${selectedOrder.id} has been shipped and assigned to a rider.`,
      })

      setIsDialogOpen(false)
    } catch (error) {
      console.error("Failed to ship order:", error)
      toast({
        title: "Error",
        description: "Failed to ship the order. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case "Paid":
        return "bg-yellow-100 text-yellow-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Undelivered":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div>Loading orders...</div>
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Rider</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    {order.riderId ? (
                      riders.find((rider) => rider.id === order.riderId)?.name || "Assigned"
                    ) : (
                      <span className="text-muted-foreground">Not assigned</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => alert(`View details for order ${order.id}`)}>
                          View Details
                        </DropdownMenuItem>
                        {order.status === "Paid" && (
                          <DropdownMenuItem onClick={() => handleShipOrder(order)}>Ship Order</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ship Order</DialogTitle>
            <DialogDescription>
              Assign a rider to ship this order. The order will be marked as "Shipped".
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Order Details</h3>
                <p className="text-sm">
                  <span className="font-medium">Order ID:</span> {selectedOrder?.id}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Customer:</span> {selectedOrder?.customerName}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Total:</span> ${selectedOrder?.total.toFixed(2)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Select Rider</h3>
                <Select value={selectedRider} onValueChange={setSelectedRider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a rider" />
                  </SelectTrigger>
                  <SelectContent>
                    {riders
                      .filter((rider) => rider.status === "available")
                      .map((rider) => (
                        <SelectItem key={rider.id} value={rider.id}>
                          {rider.name} ({rider.assignedOrders} orders)
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmShipment} disabled={!selectedRider}>
              <Truck className="mr-2 h-4 w-4" />
              Ship Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
