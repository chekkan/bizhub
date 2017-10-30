import { PLATFORM } from "aurelia-pal"

export class Index {
    configureRouter(config, router) {
        config.map([
            {
                route: "",
                name: "invoices",
                moduleId: PLATFORM.moduleName("invoices/list"),
                auth: true,
            },
            {
                route: "new",
                name: "new-invoice",
                moduleId: PLATFORM.moduleName("invoices/new"),
                title: "New",
                auth: true,
            },
        ])
        this.router = router
    }
}
