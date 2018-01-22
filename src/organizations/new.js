import { inject, Factory } from "aurelia-framework"
import { Router } from "aurelia-router"
import { ApiService } from "../services/api-service"
import { Organization } from "./organization-model"

@inject(Factory.of(ApiService), Router)
export class NewOrgViewModel {
    organization = new Organization()

    constructor(apiService, router) {
        this.router = router
        this.orgService = apiService("organization")
    }

    createOrg() {
        this.orgService.create(this.organization).then((location) => {
            this.router.navigateToRoute("organizationDetail", { id: location })
        })
    }
}
