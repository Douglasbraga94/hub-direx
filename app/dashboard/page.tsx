import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { HubDashboard } from "@/components/hub-dashboard"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  // Busca perfil do usuário
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return <HubDashboard user={user} profile={profile} />
}
