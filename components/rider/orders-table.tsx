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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import type { Order, OrderStatus } from "@/types"
import { CheckCircle, MoreHorizontal, Phone, XCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface RiderOrdersTableProps {
  status?: OrderStatus | "all"
  limit?: number
}

export default function RiderOrdersTable({ status = "all", limit }: RiderOrdersTableProps) {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDeliveryDialogOpen, setIsDeliveryDialogOpen] = useState(false)
  const [isUndeliveryDialogOpen, setIsUndeliveryDialogOpen] = useState(false)
  const [undeliveryReason, setUndeliveryReason] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Fetch orders assigned to this rider
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
            status: ["Shipped", "Delivered", "Undelivered"][Math.floor(Math.random() * 3)] as OrderStatus,
            shippingAddress: {
              street: `${1000 + index} Main St`,
              city: "Anytown",
              state: "CA",
              zipCode: "12345",
              country: "USA",
            },
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
            riderId: user?.id || `rider-0`,
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

    fetchOrders()
  }, [status, limit, user?.id])

  const handleMarkAsDelivered = (order: Order) => {
    setSelectedOrder(order)
    setIsDeliveryDialogOpen(true)
  }

  const handleMarkAsUndelivered = (order: Order) => {
    setSelectedOrder(order)
    setUndeliveryReason("")
    setIsUndeliveryDialogOpen(true)
  }

  const handleConfirmDelivery = async () => {
    if (!selectedOrder) return

    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll update the state directly
      setOrders(
        orders.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: "Delivered", updatedAt: new Date().toISOString() }
            : order,
        ),
      )

      toast({
        title: "Order delivered",
        description: `Order ${selectedOrder.id} has been marked as delivered.`,
      })

      setIsDeliveryDialogOpen(false)
    } catch (error) {
      console.error("Failed to mark order as delivered:", error)
      toast({
        title: "Error",
        description: "Failed to mark the order as delivered. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleConfirmUndelivery = async () => {
    if (!selectedOrder) return

    if (!undeliveryReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for undelivery.",
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
            ? {
                ...order,
                status: "Undelivered",
                undeliveryReason,
                updatedAt: new Date().toISOString(),
              }
            : order,
        ),
      )

      toast({
        title: "Order undelivered",
        description: `Order ${selectedOrder.id} has been marked as undelivered.`,
      })

      setIsUndeliveryDialogOpen(false)
    } catch (error) {
      console.error("Failed to mark order as undelivered:", error)
      toast({
        title: "Error",
        description: "Failed to mark the order as undelivered. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleContactCustomer = (order: Order) => {
    toast({
      title: "Contact Customer",
      description: `Contacting ${order.customerName} at ${order.customerPhone}`,
    })
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
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
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
                  <TableCell>
                    <span className="text-sm">
                      {order.shippingAddress.street}, {order.shippingAddress.city}
                    </span>
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
                        <DropdownMenuItem onClick={() => handleContactCustomer(order)}>
                          <Phone className="mr-2 h-4 w-4" />
                          Contact Customer
                        </DropdownMenuItem>
                        {order.status === "Shipped" && (
                          <>
                            <DropdownMenuItem onClick={() => handleMarkAsDelivered(order)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleMarkAsUndelivered(order)}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Mark as Undelivered
                            </DropdownMenuItem>
                          </>
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

      {/* Delivery Confirmation Dialog */}
      <Dialog open={isDeliveryDialogOpen} onOpenChange={setIsDeliveryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delivery</DialogTitle>
            <DialogDescription>Are you sure you want to mark this order as delivered?</DialogDescription>
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
                  <span className="font-medium">Address:</span> {selectedOrder?.shippingAddress.street},{" "}
                  {selectedOrder?.shippingAddress.city}
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeliveryDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmDelivery}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirm Delivery
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Undelivery Dialog */}
      <Dialog open={isUndeliveryDialogOpen} onOpenChange={setIsUndeliveryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark as Undelivered</DialogTitle>
            <DialogDescription>Please provide a reason why this order could not be delivered.</DialogDescription>
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
                  <span className="font-medium">Address:</span> {selectedOrder?.shippingAddress.street},{" "}
                  {selectedOrder?.shippingAddress.city}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Reason for Undelivery</h3>
                <textarea
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  placeholder="Please explain why the order could not be delivered..."
                  value={undeliveryReason}
                  onChange={(e) => setUndeliveryReason(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUndeliveryDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmUndelivery} disabled={!undeliveryReason.trim()}>
              <XCircle className="mr-2 h-4 w-4" />
              Mark as Undelivered
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
