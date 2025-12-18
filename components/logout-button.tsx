"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function LogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      style={{
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "8px 14px",
        borderRadius: "999px",
        fontSize: "13px",
        color: "#94a3b8",
        cursor: isLoading ? "not-allowed" : "pointer",
        opacity: isLoading ? 0.6 : 1,
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (!isLoading) {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"
          e.currentTarget.style.background = "rgba(255,255,255,0.02)"
        }
      }}
      onMouseLeave={(e) => {
        if (!isLoading) {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
          e.currentTarget.style.background = "transparent"
        }
      }}
    >
      {isLoading ? "Saindo..." : "Sair"}
    </button>
  )
}
