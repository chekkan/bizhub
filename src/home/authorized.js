import { inject, Factory } from "aurelia-framework"
import { Router } from "aurelia-router"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService), Router)
export class AuthorizedHomeViewModel {
    shouldShowCreateOrgPrompt = false
    myOrgService = null
    orgService = null
    myOrgs = []

    constructor(apiService, router) {
        this.myOrgService = apiService("me/organizations")
        this.orgService = apiService("organization")
        this.router = router
    }

    async activate() {
        return this.myOrgService.getAll(10).then((response) => {
            this.shouldShowCreateOrgPrompt = response.totalSize === 0
            this.myOrgs = response.content
        })
    }

    createOrg() {
        return this.orgService.create(this.organization)
            .then(location => this.router.navigate(`/organizations/${location}`))
    }
}
