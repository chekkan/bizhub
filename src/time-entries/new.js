import { inject, Factory } from "aurelia-framework"
import schema from "./time-entry-schema"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService))
export class NewTimeEntryViewModel {

    model = {};

    constructor(apiService) {
        this.schema = schema
        this.orgService = apiService("organization")
        this.officeService = apiService("office")
    }

    create() {
        console.log(this.model)
    }

    get organizations() {
        return this.orgService.getAll(30)
        .then(orgs => orgs.content)
        .then(orgs => orgs.map(org => ({ text: org.name, value: org.id })))
    }

    offices(orgId) {
        return this.orgService.getChild(orgId, "offices")
        .then(offices => offices.content)
        .then(offices => offices.map(office => ({ text: office.addressLine1, value: office.id })))
    }
}
