"use client"

import type React from "react"

import type { User } from "@/types"
import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface AuthContextType {
  user: User | null
  signIn: () => void
  signOut: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Mock sign in function (in a real app, this would use NextAuth/Google OAuth)
  const signIn = () => {
    // Simulate Google sign-in
    // In a real app, this would redirect to Google OAuth

    // For demo purposes, we'll show a mock sign-in dialog
    const mockUsers = [
      {
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
        role: "customer",
      },
      {
        id: "admin-1",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
      },
      {
        id: "rider-1",
        name: "Rider User",
        email: "rider@example.com",
        role: "rider",
      },
    ]

    // Simulate user selection (in a real app, this would be handled by Google OAuth)
    const selectedUser = mockUsers[Math.floor(Math.random() * mockUsers.length)]

    // Check if email is in approved list (in a real app, this would be checked on the server)
    const isApproved = true // Mock approval

    if (isApproved) {
      setUser(selectedUser)
      localStorage.setItem("user", JSON.stringify(selectedUser))

      toast({
        title: "Signed in successfully",
        description: `Welcome back, ${selectedUser.name}!`,
      })
    } else {
      toast({
        title: "Sign in failed",
        description: "Your email is not approved for access.",
        variant: "destructive",
      })
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")

    toast({
      title: "Signed out successfully",
      description: "You have been signed out.",
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
