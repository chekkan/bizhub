import { inject, Factory } from "aurelia-framework"
import { activationStrategy, Router } from "aurelia-router"
import { ApiService } from "../services/api-service"

@inject(Router, activationStrategy, Factory.of(ApiService))
export class OrganizationsIndex {

    currentPage = 1;
    lastPage = 1;
    organizations = [];
    totalSize = 0;

    constructor(router, actStrategy, apiService) {
        this.router = router
        this.activationStrategy = actStrategy
        this.organizationService = apiService("organization")
    }

    async activate(params) {
        if (params && params.page) {
            this.currentPage = +params.page
        }
        const offset = (this.currentPage - 1) * 10
        return this.getOrganizations(10, offset)
    }

    determineActivationStrategy() {
        return this.activationStrategy.invokeLifecycle
    }

    getOrganizations(limit, offset) {
        this.organizationService.getAll(limit, offset)
        .then((orgs) => {
            this.totalSize = orgs.totalSize
            this.currentPage = Math.ceil(offset / limit) + 1
            this.lastPage = Math.ceil(this.totalSize / limit)
            this.organizations = orgs.content
        })
    }
}
