// Product types
export interface Product {
  id: string
  name: string
  description: string
  fullDescription?: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  category: string
  subcategory?: string
  isNew: boolean
  isFeatured: boolean
  colors?: { name: string; value: string }[]
  sizes?: { label: string; value: string }[]
  images: string[]
  specifications?: { name: string; value: string }[]
  reviews?: ProductReview[]
}

export interface ProductReview {
  id: string
  author: string
  rating: number
  title: string
  content: string
  date: string
}

// Cart types
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  selectedColor?: string
  selectedSize?: string
}

// Order types
export type OrderStatus = "Paid" | "Shipped" | "Delivered" | "Undelivered"

export interface Order {
  id: string
  userId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: CartItem[]
  total: number
  status: OrderStatus
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: string
  updatedAt: string
  riderId: string | null
  undeliveryReason?: string
}

// User types
export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "customer" | "rider"
}

// Rider types
export type Rider = {}
