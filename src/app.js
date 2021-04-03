import { AuthenticateStep } from "./common/authenticate-step"
import routes from "./routes"

export class App {
    configureRouter(config, router) {
        this.router = router

        Object.assign(config, { title: "Busy Nest" })
        Object.assign(config.options, { pushState: true, root: "/" })

        config.addAuthorizeStep(AuthenticateStep)

        config.map(routes)

        config.mapUnknownRoutes("not-found.html")
    }
}
