import { inject, Factory } from "aurelia-framework"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService))
export class MyOrgsListCustomElement {

    myOrgService = null
    orgs = [];

    constructor(apiService) {
        this.myOrgService = apiService("me/organizations")
        this.myOrgService.getAll(10).then((response) => {
            this.orgs = response.content
        })
    }
}
