import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "../services/auth.service"

export const autoLoginGuard = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const token = authService.getToken()
  const isAuth = authService.isAuthenticated()

  console.log("[v0] autoLoginGuard executado")
  console.log("[v0] Token encontrado:", token ? "Sim" : "Não")
  console.log("[v0] isAuthenticated:", isAuth)

  if (isAuth) {
    console.log("[v0] Redirecionando para dashboard...")
    router.navigate(["/dashboard"])
    return false
  }

  console.log("[v0] Permitindo acesso ao login")
  return true
}
