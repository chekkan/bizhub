import { inject, Factory } from "aurelia-framework"
import { Router } from "aurelia-router"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService), Router)
export class New {

    constructor(apiService, router) {
        this.router = router
        this.orgService = apiService("organization")
        this.schema = {
            properties: {
                name: {
                    type: "string",
                    title: "Name",
                    required: true,
                },
            },
        }
        this.model = {}
    }

    create() {
        this.orgService.create(this.model)
        .then(() => {
            this.router.navigateToRoute("organizations")
        })
    }
}
