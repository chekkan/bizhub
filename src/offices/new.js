import { inject, Factory } from "aurelia-framework"
import { Router } from "aurelia-router"
import { ApiService } from "../services/api-service"
import schema from "./office-schema"

@inject(Router, Factory.of(ApiService))
export default class New {
    constructor(router, apiService) {
        this.router = router
        this.officeService = apiService("office")
        this.schema = schema
        this.model = {}
    }

    activate(params) {
        this.model = { organization: { id: params.id } }
    }

    create() {
        this.officeService.create(this.model).then(() => {
            this.router.navigateToRoute("organizationDetail", {
                id: this.model.organization.id,
            })
        })
    }
}
