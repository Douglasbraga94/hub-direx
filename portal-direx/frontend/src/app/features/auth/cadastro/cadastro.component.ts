import { Component, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router, RouterLink } from "@angular/router"
import { AuthService } from "../../../core/services/auth.service"

@Component({
  selector: "app-cadastro",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./cadastro.component.html",
  styleUrl: "./cadastro.component.css",
})
export class CadastroComponent {
  private authService = inject(AuthService)
  private router = inject(Router)

  nome = ""
  email = ""
  senha = ""
  confirmarSenha = ""
  error = ""
  isLoading = false

  onSubmit(): void {
    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
      this.error = "Preencha todos os campos"
      return
    }

    if (this.senha !== this.confirmarSenha) {
      this.error = "As senhas não coincidem"
      return
    }

    if (this.senha.length < 6) {
      this.error = "A senha deve ter no mínimo 6 caracteres"
      return
    }

    this.isLoading = true
    this.error = ""

    this.authService
      .cadastro({
        nome: this.nome,
        email: this.email,
        senha: this.senha,
      })
      .subscribe({
        next: () => {
          this.router.navigate(["/dashboard"])
        },
        error: (err) => {
          this.error = err.error?.message || "Erro ao criar conta. Tente novamente."
          this.isLoading = false
        },
      })
  }
}
