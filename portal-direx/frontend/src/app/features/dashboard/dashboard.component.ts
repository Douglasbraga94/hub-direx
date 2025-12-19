import { Component, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { AuthService } from "../../core/services/auth.service"
import { SistemasService, type Sistema } from "../../core/services/sistemas.service"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService)
  private sistemasService = inject(SistemasService)

  user: any = null
  sistemas: Sistema[] = []
  searchQuery = ""
  activeFilter: "all" | "web" | "api" | "admin" = "all"

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser()
    this.loadSistemas()
  }

  loadSistemas(): void {
    this.sistemasService.getSistemas().subscribe({
      next: (data) => {
        this.sistemas = data
      },
      error: (err) => {
        console.error("Erro ao carregar sistemas:", err)
      },
    })
  }

  setFilter(filter: "all" | "web" | "api" | "admin"): void {
    this.activeFilter = filter
  }

  get filteredSistemas(): Sistema[] {
    return this.sistemas.filter((s) => {
      const matchQuery =
        s.nome.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.sigla.toLowerCase().includes(this.searchQuery.toLowerCase())

      const matchFilter = this.activeFilter === "all" || (s.tipo && s.tipo === this.activeFilter)

      return matchQuery && matchFilter
    })
  }

  logout(): void {
    this.authService.logout()
  }

  getUserInitial(): string {
    return (this.user?.nome || this.user?.email || "U").charAt(0).toUpperCase()
  }
}
