import { inject, Factory } from "aurelia-framework"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService))
export class AuthorizedHomeViewModel {
    shouldShowCreateOrgPrompt = false
    myOrgService = null
    myOrgs = []

    constructor(apiService) {
        this.myOrgService = apiService("me/organizations")
    }

    async activate() {
        return this.myOrgService.getAll(10).then((response) => {
            this.shouldShowCreateOrgPrompt = response.totalSize === 0
            this.myOrgs = response.content
        })
    }
}
