import { inject, Factory, NewInstance } from "aurelia-framework"
import { Router } from "aurelia-router"
import { ValidationController, ValidationRules } from "aurelia-validation"
import { ApiService } from "../../services/api-service"

@inject(Factory.of(ApiService), Router, NewInstance.of(ValidationController))
export class CreateOrgPromptCustomElement {
    name = null
    orgService = null
    router = null
    controller = null

    constructor(apiService, router, controller) {
        this.orgService = apiService("organization")
        this.router = router
        this.controller = controller

        ValidationRules
            .ensure("name")
            .required()
            .on(this)
    }

    createOrg() {
        this.controller.validate()
            .then((result) => {
                if (result.valid) {
                    this.orgService.create({
                        name: this.name,
                    }).then(() => {
                        this.router.navigateToRoute("organizations")
                    })
                }
            })
    }
}
