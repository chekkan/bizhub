import { PLATFORM } from "aurelia-pal"

export class Index {
    configureRouter(config, router) {
        config.map([
            {
                route: "/:id",
                name: "invoice-detail",
                moduleId: PLATFORM.moduleName("invoices/detail"),
            },
        ])
        this.router = router
    }
}
