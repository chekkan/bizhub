import { inject, Factory } from "aurelia-framework"
import { Router } from "aurelia-router"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService), Router)
export class New {

    name = null

    constructor(apiService, router) {
        this.router = router
        this.orgService = apiService("organization")
    }

    createOrg() {
        this.orgService.create({
            name: this.name,
        })
        .then((location) => {
            this.router.navigateToRoute("organizationDetail", { id: location })
        })
    }
}
