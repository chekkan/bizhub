import { inject } from "aurelia-framework"
import { AuthService } from "../services/auth-service"

@inject(AuthService)
export class SignInViewModel {
    constructor(authService) {
        let href = authService.config.authEndpoint
        href += `?response_type=token&client_id=${authService.config.clientId}`
        href += `&connection=${authService.config.connectionName}`
        href += `&redirect_uri=${authService.config.redirectUri}`
        window.location.replace(href)
    }
}
