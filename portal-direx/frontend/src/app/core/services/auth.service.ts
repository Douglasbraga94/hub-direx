import { Injectable, inject } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router"
import { BehaviorSubject, type Observable, tap } from "rxjs"
import { ConfigService } from "./config.service"

export interface LoginRequest {
  email: string
  senha: string
}

export interface CadastroRequest {
  nome: string
  email: string
  senha: string
}

export interface AuthResponse {
  token: string
  usuario: {
    id: number
    nome: string
    email: string
  }
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private http = inject(HttpClient)
  private router = inject(Router)
  private config = inject(ConfigService)

  private currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage())
  public currentUser$ = this.currentUserSubject.asObservable()

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.config.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        this.setSession(response)
      }),
    )
  }

  cadastro(data: CadastroRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.config.apiUrl}/auth/cadastro`, data).pipe(
      tap((response) => {
        this.setSession(response)
      }),
    )
  }

  logout(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.currentUserSubject.next(null)
    this.router.navigate(["/login"])
  }

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem("token", authResult.token)
    localStorage.setItem("user", JSON.stringify(authResult.usuario))
    this.currentUserSubject.next(authResult.usuario)
  }

  private getUserFromStorage(): any {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  }

  getToken(): string | null {
    const token = localStorage.getItem("token")
    console.log("[v0] AuthService.getToken():", token ? "Token encontrado" : "Sem token")
    return token
  }

  isAuthenticated(): boolean {
    const hasToken = !!this.getToken()
    console.log("[v0] AuthService.isAuthenticated():", hasToken)
    return hasToken
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value
  }
}
