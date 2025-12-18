import { Injectable, inject } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import { environment } from "../../../environments/environment"

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

  getSistemas(): Observable<Sistema[]> {
    return this.http.get<Sistema[]>(`${environment.apiUrl}/sistemas`)
  }

  getSistema(id: number): Observable<Sistema> {
    return this.http.get<Sistema>(`${environment.apiUrl}/sistemas/${id}`)
  }
}
