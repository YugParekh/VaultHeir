import type { ReactNode } from "react"
import { requireAuth } from "@/lib/auth"
import { DashboardShell } from "@/components/dashboard-shell"

export default async function HeirsLayout({ children }: { children: ReactNode }) {
  const user = await requireAuth()

  return <DashboardShell user={user}>{children}</DashboardShell>
}
