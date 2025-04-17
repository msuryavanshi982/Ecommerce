"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, ShoppingBag, Truck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import RiderOrdersTable from "./orders-table"
import RiderSidebar from "./sidebar"
import { useAuth } from "@/context/auth-context"

export default function RiderDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    assignedOrders: 0,
    deliveredOrders: 0,
    undeliveredOrders: 0,
  })

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        setStats({
          assignedOrders: 12,
          deliveredOrders: 45,
          undeliveredOrders: 3,
        })
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="flex min-h-screen">
      <RiderSidebar />
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Rider Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name || "Rider"}</p>
          </div>
          <Link href="/rider/orders">
            <Button>View All Orders</Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.assignedOrders}</div>
              <p className="text-xs text-muted-foreground">Orders waiting to be delivered</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.deliveredOrders}</div>
              <p className="text-xs text-muted-foreground">Total orders delivered</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Undelivered Orders</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.undeliveredOrders}</div>
              <p className="text-xs text-muted-foreground">Orders that couldn't be delivered</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="assigned">
            <TabsList>
              <TabsTrigger value="assigned">Assigned Orders</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="undelivered">Undelivered</TabsTrigger>
            </TabsList>
            <TabsContent value="assigned" className="mt-4">
              <RiderOrdersTable status="Shipped" limit={5} />
            </TabsContent>
            <TabsContent value="delivered" className="mt-4">
              <RiderOrdersTable status="Delivered" limit={5} />
            </TabsContent>
            <TabsContent value="undelivered" className="mt-4">
              <RiderOrdersTable status="Undelivered" limit={5} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
