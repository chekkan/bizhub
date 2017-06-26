import { inject } from "aurelia-framework"
import { Router } from "aurelia-router"
import schema from "./registration-schema"
import { AuthService } from "../services/auth-service"

@inject(AuthService, Router)
export class SignupViewModel {

    constructor(authService, router) {
        this.router = router
        this.authService = authService
        this.schema = schema
        this.model = {}
    }

    register() {
        this.authService.register(this.model)
        .then(() => {
            this.router.navigateToRoute("login")
        })
    }

}
