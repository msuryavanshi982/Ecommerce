"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, ShoppingBag, Truck, User } from "lucide-react"

export default function RiderSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="hidden md:flex w-64 flex-col border-r bg-muted/40 h-screen">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/rider" className="flex items-center gap-2 font-semibold">
          <Truck className="h-6 w-6" />
          <span>Rider Panel</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          <Link
            href="/rider"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/rider")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/rider/orders"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/rider/orders")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            Orders
          </Link>
          <Link
            href="/rider/delivered"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/rider/delivered")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Package className="h-4 w-4" />
            Delivered
          </Link>
          <Link
            href="/rider/profile"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/rider/profile")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <User className="h-4 w-4" />
            Profile
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
