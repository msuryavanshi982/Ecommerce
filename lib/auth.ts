import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if the user's email is in the approved_emails collection
      if (user.email) {
        // In a real app, this would check against a database
        // For demo purposes, we'll use a hardcoded list
        const approvedEmails = ["admin@example.com", "rider@example.com", "customer@example.com"]

        return approvedEmails.includes(user.email)
      }
      return false
    },
    async jwt({ token, user }) {
      if (user) {
        // Add role to token based on email
        // In a real app, this would come from the database
        if (user.email?.includes("admin")) {
          token.role = "admin"
        } else if (user.email?.includes("rider")) {
          token.role = "rider"
        } else {
          token.role = "customer"
        }
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
}
