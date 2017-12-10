import { inject, Factory } from "aurelia-framework"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService))
export class OrgSettings {
    orgService = null
    org = null
    name = null

    constructor(apiService) {
        this.orgService = apiService("organization")
    }

    async activate(params) {
        console.log(params)
        return this.orgService.getById(params.id)
        .then((org) => {
            this.org = org
            this.name = org.name
        })
    }
}
