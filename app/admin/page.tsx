import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AdminDashboard from "@/components/admin/dashboard"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated and has admin role
  if (!session || session.user.role !== "admin") {
    redirect("/api/auth/signin")
  }

  return <AdminDashboard />
}
