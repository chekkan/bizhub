import { inject, Factory } from "aurelia-framework"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService))
export class New {

    constructor(apiService) {
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
