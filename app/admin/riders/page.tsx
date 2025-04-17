import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AdminRidersTable from "@/components/admin/riders-table"

export default async function AdminRidersPage() {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated and has admin role
  if (!session || session.user.role !== "admin") {
    redirect("/api/auth/signin")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Riders</h1>
      <AdminRidersTable />
    </div>
  )
}
