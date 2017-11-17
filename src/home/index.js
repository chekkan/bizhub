import { PLATFORM } from "aurelia-pal"
import { inject } from "aurelia-framework"
import { AuthService } from "../services/auth-service"

@inject(AuthService)
export class Index {

    authService = null

    constructor(authService) {
        this.authService = authService
    }

    configureRouter(config, router) {
        const navStrat = (instruction) => {
            const isLoggedIn = this.authService.isAuthenticated

            const moduleId = isLoggedIn ? PLATFORM.moduleName("home/authorized")
                : PLATFORM.moduleName("home/visitor")
            Object.assign(instruction.config, {
                moduleId,
                href: instruction.fragment,
            })
        }
        config.map([
            {
                route: "",
                name: "home",
                navigationStrategy: navStrat,
            },
        ])
        this.router = router
    }
}
