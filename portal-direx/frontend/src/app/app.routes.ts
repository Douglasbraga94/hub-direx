import type { Routes } from "@angular/router"
import { authGuard } from "./core/guards/auth.guard"
import { autoLoginGuard } from "./core/guards/auto-login.guard"

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./features/auth/login/login.component").then((m) => m.LoginComponent),
    canActivate: [autoLoginGuard],
  },
  {
    path: "login",
    loadComponent: () => import("./features/auth/login/login.component").then((m) => m.LoginComponent),
    canActivate: [autoLoginGuard],
  },
  {
    path: "cadastro",
    loadComponent: () => import("./features/auth/cadastro/cadastro.component").then((m) => m.CadastroComponent),
  },
  {
    path: "dashboard",
    loadComponent: () => import("./features/dashboard/dashboard.component").then((m) => m.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: "**",
    redirectTo: "/login",
  },
]
