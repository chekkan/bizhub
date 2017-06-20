import { inject, Factory } from "aurelia-framework"
import { Router } from "aurelia-router"
import schema from "./time-entry-schema"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService), Router)
export class NewTimeEntryViewModel {

    model = {};

    constructor(apiService, router) {
        this.schema = schema
        this.orgService = apiService("organization")
        this.timeEntryService = apiService("time-entry")
        this.router = router
    }

    create() {
        const transModel = {
            start: this.model.start,
            end: this.model.end,
            break: Number(this.model.break),
            ratePerHour: Number(this.model.ratePerHour),
            organization: {
                id: this.model.organization.id,
            },
            office: {
                id: this.model.office.id,
            },
        }
        console.log(transModel)
        this.timeEntryService.create(transModel)
        .then((response) => {
            console.log(response)
            this.router.navigateToRoute("time-entries")
        }).catch((err) => {
            console.log(err)
        })
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
