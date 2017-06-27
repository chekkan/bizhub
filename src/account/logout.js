import { inject } from "aurelia-framework"
import { AuthService } from "../services/auth-service"

@inject(AuthService)
export class LogoutViewModel {
    constructor(authService) {
        let href = authService.config.logoutUrl
        href += `?client_id=${authService.config.clientId}`
        href += `&returnTo=${authService.config.redirectUri}?action=logout`
        window.location.replace(href)
    }
}
