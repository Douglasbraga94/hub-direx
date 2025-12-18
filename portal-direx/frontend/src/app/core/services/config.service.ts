import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  private config: any = null

  async loadConfig(): Promise<void> {
    try {
      const response = await fetch("/assets/config.json")
      this.config = await response.json()
    } catch (error) {
      console.error("Erro ao carregar configurações:", error)
      // Fallback para valores padrão
      this.config = {
        apiUrl: "http://localhost:8080/api",
      }
    }
  }

  get apiUrl(): string {
    return this.config?.apiUrl || "http://localhost:8080/api"
  }
}
