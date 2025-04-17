"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, Home, Package, ShoppingCart, Truck, Users } from "lucide-react"

export default function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="hidden md:flex w-64 flex-col border-r bg-muted/40 h-screen">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span>Admin Panel</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          <Link
            href="/admin"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/admin")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/orders"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/admin/orders")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            Orders
          </Link>
          <Link
            href="/admin/riders"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/admin/riders")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Truck className="h-4 w-4" />
            Riders
          </Link>
          <Link
            href="/admin/customers"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/admin/customers")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Users className="h-4 w-4" />
            Customers
          </Link>
          <Link
            href="/admin/analytics"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/admin/analytics")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <BarChart className="h-4 w-4" />
            Analytics
          </Link>
        </nav>
      </div>
      <div className="border-t p-4">
        <Link href="/">
          <Button variant="outline" className="w-full">
            Back to Store
          </Button>
        </Link>
      </div>
    </div>
  )
}
