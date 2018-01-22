import { bindable } from "aurelia-framework"
import { AuthService } from "./services/auth-service"

export class NavBar {
    static inject() {
        return [
            AuthService,
        ]
    }

    @bindable router = null;

    constructor(authService) {
        this.authService = authService
    }

    get isAuthenticated() {
        return this.authService.isAuthenticated
    }
}
