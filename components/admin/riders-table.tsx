"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import type { Rider } from "@/types"
import { MoreHorizontal, Phone } from "lucide-react"
import { useEffect, useState } from "react"

export default function AdminRidersTable() {
  const [riders, setRiders] = useState<Rider[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Fetch riders
    const fetchRiders = async () => {
      try {
        setLoading(true)
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        const mockRiders: Rider[] = Array(10)
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
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch riders:", error)
        setLoading(false)
      }
    }

    fetchRiders()
  }, [])

  const handleContactRider = (rider: Rider) => {
    toast({
      title: "Contact Rider",
      description: `Contacting ${rider.name} at ${rider.phone}`,
    })
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div>Loading riders...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned Orders</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {riders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No riders found
              </TableCell>
            </TableRow>
          ) : (
            riders.map((rider) => (
              <TableRow key={rider.id}>
                <TableCell className="font-medium">{rider.name}</TableCell>
                <TableCell>{rider.email}</TableCell>
                <TableCell>{rider.phone}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(rider.status)}`}>
                    {rider.status}
                  </span>
                </TableCell>
                <TableCell>{rider.assignedOrders}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => alert(`View details for rider ${rider.id}`)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleContactRider(rider)}>
                        <Phone className="mr-2 h-4 w-4" />
                        Contact Rider
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
