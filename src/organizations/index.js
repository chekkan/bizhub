import { PLATFORM } from "aurelia-pal"

export class Index {
    configureRouter(config, router) {
        config.map([
            {
                route: "",
                name: "organizations",
                moduleId: PLATFORM.moduleName("organizations/list"),
            },
            {
                route: "new",
                name: "organizationNew",
                moduleId: PLATFORM.moduleName("organizations/new"),
                title: "New",
                auth: true,
            },
            {
                route: "/:id",
                name: "organizationDetail",
                moduleId: PLATFORM.moduleName("organizations/detail"),
            },
        ])
        this.router = router
    }
}
