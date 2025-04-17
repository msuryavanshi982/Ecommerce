"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  const shipping = subtotal > 0 ? 10 : 0
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    setIsLoading(true)

    // Simulate checkout process
    setTimeout(() => {
      clearCart()
      setIsLoading(false)
      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed and will be processed soon.",
      })
      router.push("/checkout/success")
    }, 1500)
  }

  if (cart.length === 0) {
    return (
      <div className="container px-4 md:px-6 py-6 md:py-10">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4">
            <svg
              className="h-24 w-24 text-muted-foreground mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground mt-1 mb-4">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Quantity</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Total</th>
                    <th className="px-4 py-3 text-left text-sm font-medium sr-only">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {cart.map((item) => (
                    <tr key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 overflow-hidden rounded border bg-muted">
                            <Image
                              src={item.image || "/placeholder.svg?height=64&width=64"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <div className="flex gap-2 text-sm text-muted-foreground mt-1">
                              {item.selectedColor && (
                                <div className="flex items-center gap-1">
                                  <span>Color:</span>
                                  <span
                                    className="h-3 w-3 rounded-full border"
                                    style={{ backgroundColor: item.selectedColor }}
                                  ></span>
                                </div>
                              )}
                              {item.selectedSize && (
                                <div>
                                  <span>Size: {item.selectedSize}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <div className="h-8 w-10 flex items-center justify-center border-y">{item.quantity}</div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => updateQuantity(item, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="px-4 py-4">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Link href="/products">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            <Button variant="outline" onClick={() => clearCart()}>
              Clear Cart
            </Button>
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button className="w-full mt-4" onClick={handleCheckout} disabled={isLoading}>
              {isLoading ? "Processing..." : "Checkout"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
