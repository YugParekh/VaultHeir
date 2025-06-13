import { requireAuth } from "@/lib/auth"
import SettingsPage from "./page"

export default async function SettingsLayout() {
  const user = await requireAuth()

  return <SettingsPage user={user} />
}
