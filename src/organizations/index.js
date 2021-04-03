import { PLATFORM } from "aurelia-pal"

export class Index {
    configureRouter(config, router) {
        // const navStrat = (instruction) => {
        //     if (true) {
        //         console.log(instruction)
        //         Object.assign(instruction.config, {
        //             moduleId: PLATFORM.moduleName("not-found.html"),
        //             href: instruction.fragment,
        //         })
        //     }
        // }
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
            {
                route: "/:id/settings",
                name: "org-settings",
                moduleId: PLATFORM.moduleName("organizations/settings"),
                title: "Settings",
                auth: true,
                // navigationStrategy: navStrat,
            },
            {
                route: "/:orgId/invoices/new",
                name: "new-org-invoice",
                moduleId: PLATFORM.moduleName("invoices/new-invoice"),
                title: "New",
                auth: true,
            },
        ])
        this.router = router
    }
}
