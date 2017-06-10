import { bindable } from "aurelia-framework"
import { AuthService } from "aurelia-authentication"

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

    get authenticated() {
        return this.authService.isAuthenticated()
    }
}
