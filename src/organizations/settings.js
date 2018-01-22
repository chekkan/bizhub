import { inject, Factory } from "aurelia-framework"
import { Router } from "aurelia-router"
import { ApiService } from "../services/api-service"
import { AuthService } from "../services/auth-service"

@inject(Factory.of(ApiService), AuthService, Router)
export class OrgSettings {
    authService = null
    orgService = null
    org = null
    name = null

    constructor(apiService, authService, router) {
        this.orgService = apiService("organization")
        this.authService = authService
        this.router = router
    }

    async activate(params) {
        const org = await this.orgService.getById(params.id)
        const isOwner = org.owner.id === this.authService.userId
        if (!isOwner) {
            this.router.navigate("/")
        } else {
            this.org = org
            this.name = org.name
        }
    }

    async delete() {
        await this.orgService.delete(this.org.id)
        this.router.navigateToRoute("organizations")
    }

    cancel() {
        this.router.navigateToRoute("organizationDetail", { id: this.org.id })
    }
}
