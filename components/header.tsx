"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Menu, Search, User } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { cart } = useCart()
  const { user, signIn, signOut } = useAuth()

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                href="/"
                className="text-lg font-semibold"
                onClick={() => document.querySelector<HTMLElement>("[data-radix-collection-item]")?.click()}
              >
                Home
              </Link>
              <Link
                href="/products?category=fans"
                className="text-lg font-semibold"
                onClick={() => document.querySelector<HTMLElement>("[data-radix-collection-item]")?.click()}
              >
                Fans
              </Link>
              <Link
                href="/products?category=air-conditioners"
                className="text-lg font-semibold"
                onClick={() => document.querySelector<HTMLElement>("[data-radix-collection-item]")?.click()}
              >
                Air Conditioners
              </Link>
              <Link
                href="/products"
                className="text-lg font-semibold"
                onClick={() => document.querySelector<HTMLElement>("[data-radix-collection-item]")?.click()}
              >
                All Products
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">CoolBreeze</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/products?category=fans" className="font-medium transition-colors hover:text-primary">
            Fans
          </Link>
          <Link href="/products?category=air-conditioners" className="font-medium transition-colors hover:text-primary">
            Air Conditioners
          </Link>
          <Link href="/products" className="font-medium transition-colors hover:text-primary">
            All Products
          </Link>
        </nav>

        <div className="flex items-center ml-auto gap-2">
          <form
            className={cn(
              "hidden md:flex items-center relative transition-all duration-300",
              isSearchOpen ? "w-64" : "w-0",
            )}
            onSubmit={(e) => {
              e.preventDefault()
              const searchInput = e.currentTarget.querySelector("input")
              if (searchInput && searchInput.value) {
                window.location.href = `/products?search=${encodeURIComponent(searchInput.value)}`
              }
            }}
          >
            {isSearchOpen && (
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
            )}
          </form>

          <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="h-5 w-5" />
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Account">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/account">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/orders">My Orders</Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/orders">Manage Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/riders">Manage Riders</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {user.role === "rider" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/rider">Rider Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/rider/orders">My Assigned Orders</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" aria-label="Sign In" onClick={signIn}>
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
