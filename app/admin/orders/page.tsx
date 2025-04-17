import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AdminOrdersTable from "@/components/admin/orders-table"

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated and has admin role
  if (!session || session.user.role !== "admin") {
    redirect("/api/auth/signin")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <AdminOrdersTable />
    </div>
  )
}
