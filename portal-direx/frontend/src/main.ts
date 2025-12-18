import { bootstrapApplication } from "@angular/platform-browser"
import { provideRouter } from "@angular/router"
import { provideHttpClient, withInterceptors } from "@angular/common/http"
import { AppComponent } from "./app/app.component"
import { routes } from "./app/app.routes"
import { authInterceptor } from "./app/core/interceptors/auth.interceptor"
import { ConfigService } from "./app/core/services/config.service"

const configService = new ConfigService()

configService.loadConfig().then(() => {
  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      provideHttpClient(withInterceptors([authInterceptor])),
      { provide: ConfigService, useValue: configService },
    ],
  }).catch((err) => console.error(err))
})
