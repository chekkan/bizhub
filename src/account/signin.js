import { inject } from "aurelia-framework"
import { AuthService } from "../services/auth-service"

@inject(AuthService)
export class SignInViewModel {
    constructor(authService) {
        const nonce = authService.generateNonce()
        authService.saveNonce(nonce)
        let href = authService.config.authEndpoint
        href += `?response_type=id_token token&client_id=${authService.config.clientId}`
        href += `&connection=${authService.config.connectionName}`
        href += `&redirect_uri=${authService.config.redirectUri}`
        href += `&nonce=${nonce}`
        href += `&audience=${authService.config.audience}`
        window.location.replace(href)
    }
}
