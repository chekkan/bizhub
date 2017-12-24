import { inject, Factory } from "aurelia-framework"
import { Router } from "aurelia-router"
import { ApiService } from "../services/api-service"

@inject(Router, Factory.of(ApiService))
export class OrgDetailViewModel {
    constructor(router, apiService) {
        this.router = router
        this.organizationService = apiService("organization")
        this.organization = {}
    }

    configureRouter(config, router) {
        config.map([
            { route: ["", "invoices"], moduleId: "invoices/invoice-list", title: "Invoices" },
        ])

        this.router = router
    }

    async activate(params, route) {
        return this.organizationService.getById(params.id)
            .then((org) => {
                this.organization = org
                Object.assign(route.navModel, { title: org.name })
            })
    }
}
