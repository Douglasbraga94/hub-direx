import { Component, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router, RouterLink } from "@angular/router"
import { AuthService } from "../../../core/services/auth.service"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  private authService = inject(AuthService)
  private router = inject(Router)

  email = ""
  senha = ""
  error = ""
  isLoading = false

  onSubmit(): void {
    if (!this.email || !this.senha) {
      this.error = "Preencha todos os campos"
      return
    }

    this.isLoading = true
    this.error = ""

    this.authService.login({ email: this.email, senha: this.senha }).subscribe({
      next: () => {
        this.router.navigate(["/dashboard"])
      },
      error: (err) => {
        this.error = err.error?.message || "Erro ao fazer login. Verifique suas credenciais."
        this.isLoading = false
      },
    })
  }
}
