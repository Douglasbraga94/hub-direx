import { Injectable, inject } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import { ConfigService } from "./config.service"

export interface Sistema {
  id: number
  nome: string
  sigla: string
  url: string
  dtCriacao: string
  updatedAt: string
  gestorId: number
  gestor?: {
    id: number
    nome: string
  }
}

@Injectable({
  providedIn: "root",
})
export class SistemasService {
  private http = inject(HttpClient)
  private config = inject(ConfigService)

  getSistemas(): Observable<Sistema[]> {
    return this.http.get<Sistema[]>(`${this.config.apiUrl}/sistemas`)
  }

  getSistema(id: number): Observable<Sistema> {
    return this.http.get<Sistema>(`${this.config.apiUrl}/sistemas/${id}`)
  }
}
