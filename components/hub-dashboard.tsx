"use client"

import { useState, useMemo } from "react"
import type { User } from "@supabase/supabase-js"
import { LogoutButton } from "@/components/logout-button"
import { Search } from "lucide-react"

interface HubDashboardProps {
  user: User
  profile: {
    full_name?: string
  } | null
}

interface System {
  id: number
  name: string
  desc: string
  type: "web" | "api" | "admin"
  url: string
  status: "up" | "down"
}

const systems: System[] = [
  {
    id: 1,
    name: "Sistema de Vendas",
    desc: "Gerencie pedidos, clientes e faturamento",
    type: "web",
    url: "#",
    status: "up",
  },
  {
    id: 2,
    name: "API de Pagamentos",
    desc: "Processamento e conciliação de pagamentos",
    type: "api",
    url: "#",
    status: "down",
  },
  { id: 3, name: "Admin Console", desc: "Painel administrativo e usuários", type: "admin", url: "#", status: "up" },
  { id: 4, name: "Portal RH", desc: "Folha, ponto e benefícios", type: "web", url: "#", status: "up" },
  { id: 5, name: "Serviço de Notificações", desc: "Envio de e-mails e push", type: "api", url: "#", status: "up" },
  { id: 6, name: "BI e Dashboards", desc: "Relatórios e KPIs", type: "web", url: "#", status: "up" },
  { id: 7, name: "Integrações Externas", desc: "Conectores com parceiros", type: "api", url: "#", status: "up" },
  { id: 8, name: "Gestão de Acessos", desc: "SSO, permissões e logs", type: "admin", url: "#", status: "up" },
]

export function HubDashboard({ user, profile }: HubDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "web" | "api" | "admin">("all")

  const filteredSystems = useMemo(() => {
    return systems.filter((s) => {
      const matchQuery =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.desc.toLowerCase().includes(searchQuery.toLowerCase())
      const matchType = activeFilter === "all" ? true : s.type === activeFilter
      return matchQuery && matchType
    })
  }, [searchQuery, activeFilter])

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0f1724, #051026 120%)",
        color: "#e6eef8",
        padding: "28px",
        fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          gap: "18px",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #06b6d4, #7c3aed)",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 6px 18px rgba(7, 10, 22, 0.6)",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3v3" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="2.6" stroke="white" strokeWidth="1.6" fill="rgba(255,255,255,0.06)" />
              <path d="M12 21v-3" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: "18px", margin: 0 }}>Hub de Sistemas</h1>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "13px" }}>
              Acesse e gerencie todos os seus sistemas a partir deste painel.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "8px 14px",
              borderRadius: "12px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #06b6d4, #7c3aed)",
                display: "grid",
                placeItems: "center",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {(profile?.full_name || user.email || "U").charAt(0).toUpperCase()}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <div style={{ fontSize: "13px", fontWeight: "500" }}>{profile?.full_name || "Usuário"}</div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>{user.email}</div>
            </div>
          </div>
          <LogoutButton />
        </div>
      </header>

      {/* Search and Filters */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", marginBottom: "20px" }}>
        {/* Search */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.03)",
            padding: "10px 12px",
            borderRadius: "12px",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            minWidth: "260px",
            flex: 1,
            maxWidth: "400px",
          }}
        >
          <Search style={{ width: "16px", height: "16px", opacity: 0.9 }} />
          <input
            type="text"
            placeholder="Buscar sistema, módulo ou função..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: "transparent",
              border: 0,
              outline: "none",
              color: "inherit",
              fontSize: "13px",
              width: "100%",
            }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "8px" }}>
          {(["all", "web", "api", "admin"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                background:
                  activeFilter === filter
                    ? "linear-gradient(90deg, rgba(6,182,212,0.12), rgba(124,58,237,0.08))"
                    : "transparent",
                border: activeFilter === filter ? "1px solid rgba(6,182,212,0.28)" : "1px solid rgba(255,255,255,0.04)",
                padding: "8px 10px",
                borderRadius: "999px",
                fontSize: "13px",
                color: activeFilter === filter ? "#06b6d4" : "#94a3b8",
                cursor: "pointer",
              }}
            >
              {filter === "all" ? "Todos" : filter === "web" ? "Web" : filter === "api" ? "API" : "Admin"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <main style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "20px" }}>
        {/* Systems Section */}
        <section
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)",
            padding: "18px",
            borderRadius: "14px",
            boxShadow: "0 8px 30px rgba(2, 6, 23, 0.6)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
            <h2 style={{ margin: 0 }}>Sistemas</h2>
            <div style={{ color: "#94a3b8" }}>
              Mostrando <span>{filteredSystems.length}</span> itens
            </div>
          </div>

          {/* Systems Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "14px",
              marginTop: "14px",
            }}
          >
            {filteredSystems.map((system) => (
              <a
                key={system.id}
                href={system.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.03)",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 0.18s ease, box-shadow 0.18s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)"
                  e.currentTarget.style.boxShadow = "0 18px 40px rgba(2, 6, 23, 0.6)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid rgba(255,255,255,0.03)",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="6" stroke="white" strokeOpacity="0.95" strokeWidth="1.2" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: "15px" }}>{system.name}</h3>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94a3b8" }}>{system.desc}</p>
                </div>
                <div style={{ marginLeft: "auto", textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      padding: "6px 8px",
                      borderRadius: "999px",
                      border:
                        system.status === "up" ? "1px solid rgba(22,163,74,0.12)" : "1px solid rgba(239,68,68,0.12)",
                      color: system.status === "up" ? "#16a34a" : "#ef4444",
                      background: system.status === "up" ? "rgba(22,163,74,0.04)" : "rgba(239,68,68,0.03)",
                    }}
                  >
                    {system.status === "up" ? "Online" : "Offline"}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <footer style={{ marginTop: "16px", color: "#94a3b8", fontSize: "13px" }}>
            Dica: clique em um cartão para abrir o sistema em nova aba. Use a busca para filtrar por nome ou descrição.
          </footer>
        </section>

        {/* Sidebar */}
        <aside
          style={{
            background: "#0b1220",
            padding: "16px",
            borderRadius: "14px",
            height: "fit-content",
            border: "1px solid rgba(255,255,255,0.02)",
          }}
        >
          <h4 style={{ margin: "0 0 12px 0" }}>Atividades recentes</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div
                style={{
                  minWidth: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.03)",
                }}
              >
                A
              </div>
              <div>
                <strong>Sistema de Vendas</strong>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>Atualizado há 2 horas</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div
                style={{
                  minWidth: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.03)",
                }}
              >
                B
              </div>
              <div>
                <strong>API de Pagamentos</strong>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>Erro: tempo limite</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div
                style={{
                  minWidth: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.03)",
                }}
              >
                C
              </div>
              <div>
                <strong>Admin Console</strong>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>Backup concluído</div>
              </div>
            </div>
          </div>

          <hr style={{ margin: "14px 0", border: "none", borderTop: "1px solid rgba(255,255,255,0.02)" }} />

          <h4 style={{ margin: "0 0 8px 0" }}>Atalhos</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              onClick={() => alert("Abrir administração")}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.04)",
                padding: "8px 10px",
                borderRadius: "999px",
                fontSize: "13px",
                color: "#94a3b8",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              Painel Admin
            </button>
            <button
              onClick={() => alert("Abrir dashboards")}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.04)",
                padding: "8px 10px",
                borderRadius: "999px",
                fontSize: "13px",
                color: "#94a3b8",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              Dashboards
            </button>
            <button
              onClick={() => alert("Abrir configurações")}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.04)",
                padding: "8px 10px",
                borderRadius: "999px",
                fontSize: "13px",
                color: "#94a3b8",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              Configurações
            </button>
          </div>
        </aside>
      </main>

      <style jsx>{`
        @media (max-width: 1000px) {
          main {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
