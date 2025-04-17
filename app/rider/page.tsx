import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import RiderDashboard from "@/components/rider/dashboard"

export default async function RiderPage() {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated and has rider role
  if (!session || session.user.role !== "rider") {
    redirect("/api/auth/signin")
  }

  return <RiderDashboard />
}
