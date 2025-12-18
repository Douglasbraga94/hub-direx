import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export default function CadastroSucessoPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Portal Direx</h1>
          <p className="text-gray-600">Sistema de Gestão Empresarial</p>
        </div>

        <Card className="shadow-xl border-gray-200">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Cadastro realizado com sucesso!</CardTitle>
            <CardDescription>Verifique seu e-mail para confirmar sua conta</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Enviamos um link de confirmação para o seu e-mail. Por favor, clique no link para ativar sua conta antes
              de fazer login.
            </p>
            <Button asChild className="w-full h-11 bg-blue-600 hover:bg-blue-700">
              <Link href="/login">Ir para login</Link>
            </Button>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2025 Portal Direx. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}
