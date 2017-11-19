import { inject } from "aurelia-framework"
import { AuthService } from "../../../services/auth-service"

@inject(AuthService)
export class SignInCustomElement {
    authService = null

    constructor(authService) {
        this.authService = authService
    }

    loginWithGoogle() {
        const nonce = this.authService.generateNonce()
        this.authService.saveNonce(nonce)
        let href = this.authService.config.authEndpoint
        href += `?response_type=id_token token&client_id=${this.authService.config.clientId}`
        href += "&connection=google-oauth2"
        href += `&redirect_uri=${this.authService.config.redirectUri}`
        href += `&nonce=${nonce}`
        href += `&audience=${this.authService.config.audience}`
        window.location.replace(href)
    }
}
