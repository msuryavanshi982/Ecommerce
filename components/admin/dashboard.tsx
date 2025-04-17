"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, ShoppingCart, Truck, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import AdminOrdersTable from "./orders-table"
import AdminSidebar from "./sidebar"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalRiders: 0,
  })

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        setStats({
          totalOrders: 156,
          pendingOrders: 23,
          shippedOrders: 45,
          deliveredOrders: 88,
          totalRevenue: 28945.75,
          totalCustomers: 89,
          totalRiders: 12,
        })
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <Link href="/admin/orders">
              <Button>Manage Orders</Button>
            </Link>
            <Link href="/admin/riders">
              <Button variant="outline">Manage Riders</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 20)}% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 20)}% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 20)}% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Riders</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRiders}</div>
              <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 20)}% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <AdminOrdersTable status="all" limit={5} />
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <AdminOrdersTable status="Paid" limit={5} />
            </TabsContent>
            <TabsContent value="shipped" className="mt-4">
              <AdminOrdersTable status="Shipped" limit={5} />
            </TabsContent>
            <TabsContent value="delivered" className="mt-4">
              <AdminOrdersTable status="Delivered" limit={5} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
