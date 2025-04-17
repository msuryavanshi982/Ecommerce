"use client"

import type React from "react"

import type { CartItem } from "@/types"
import { createContext, useContext, useEffect, useState } from "react"

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (item: CartItem) => void
  updateQuantity: (item: CartItem, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Check if item already exists in cart with same variants
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.selectedColor === item.selectedColor &&
          cartItem.selectedSize === item.selectedSize,
      )

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += item.quantity
        return updatedCart
      } else {
        // Add new item to cart
        return [...prevCart, item]
      }
    })
  }

  const removeFromCart = (item: CartItem) => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) =>
          !(
            cartItem.id === item.id &&
            cartItem.selectedColor === item.selectedColor &&
            cartItem.selectedSize === item.selectedSize
          ),
      ),
    )
  }

  const updateQuantity = (item: CartItem, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id &&
        cartItem.selectedColor === item.selectedColor &&
        cartItem.selectedSize === item.selectedSize
          ? { ...cartItem, quantity }
          : cartItem,
      ),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
