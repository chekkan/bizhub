import { inject, Factory } from "aurelia-framework"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService))
export class AuthorizedHomeViewModel {
    shouldShowCreateOrgPrompt = false

    constructor(apiService) {
        const meService = apiService("me/organizations")
        meService.getAll(0).then((response) => {
            this.shouldShowCreateOrgPrompt = response.totalSize === 0
        })
    }
}
