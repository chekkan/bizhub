import { PLATFORM } from "aurelia-pal"

export class Index {
    configureRouter(config, router) {
        config.map([
            {
                route: "",
                name: "time-entries",
                moduleId: PLATFORM.moduleName("time-entries/list"),
                auth: true,
            },
            {
                route: "new",
                name: "new-time-entry",
                moduleId: PLATFORM.moduleName("time-entries/new"),
                title: "New",
                auth: true,
            },
        ])
        this.router = router
    }
}
