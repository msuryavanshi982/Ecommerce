import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  return (
    <div className="container px-4 md:px-6 py-12 md:py-20">
      <div className="mx-auto max-w-md text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-6 text-3xl font-bold">Order Successful!</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you for your purchase. Your order has been placed and will be processed soon.
        </p>
        <div className="mt-8 border rounded-lg p-6 text-left">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number</span>
              <span className="font-medium">#ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium">Credit Card</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping Method</span>
              <span className="font-medium">Standard Shipping</span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
          <Link href="/account/orders">
            <Button variant="outline">View Orders</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
