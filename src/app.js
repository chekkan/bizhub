import { AuthenticateStep } from "./common/authenticate-step"
import routes from "./routes"

export class App {

    configureRouter(config, router) {
        this.router = router

        Object.assign(config, { title: "Bizhub" })
        Object.assign(config.options, { pushState: true, root: "/" })

        config.addPipelineStep("authorize", AuthenticateStep)

        config.map(routes)

        config.mapUnknownRoutes("not-found")
    }
}
