import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import RiderOrdersTable from "@/components/rider/orders-table"

export default async function RiderOrdersPage() {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated and has rider role
  if (!session || session.user.role !== "rider") {
    redirect("/api/auth/signin")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Assigned Orders</h1>
      <RiderOrdersTable />
    </div>
  )
}
