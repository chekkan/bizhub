import { inject } from "aurelia-framework"
import { Redirect } from "aurelia-router"
import { AuthService } from "../services/auth-service"

@inject(AuthService)
export class AuthenticateStep {
    constructor(authService) {
        this.authService = authService
    }

    run(navigationInstruction, next) {
        const isLoggedIn = this.authService.isAuthenticated
        const { loginRoute } = this.authService.config.loginRoute

        if (navigationInstruction.getAllInstructions()
            .some(route => route.config.auth === true)) {
            if (!isLoggedIn) {
                return next.cancel(new Redirect(loginRoute))
            }
        }

        return next()
    }
}
