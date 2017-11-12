import { inject, Factory, LogManager } from "aurelia-framework"
import { Router } from "aurelia-router"
import moment from "moment"
import schema from "./time-entry-schema"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService), Router)
export class NewTimeEntryViewModel {

    model = {};

    constructor(apiService, router) {
        this.logger = LogManager.getLogger("NewTimeEntryViewModel")
        this.schema = schema
        this.orgService = apiService("organization")
        this.timeEntryService = apiService("time-entry")
        this.router = router
    }

    create() {
        const transModel = Object.assign({}, this.model, {
            start: moment(this.model.start).utc().format(),
            end: moment(this.model.end).utc().format(),
        })
        this.logger.debug(transModel)
        this.timeEntryService.create(transModel)
        .then((response) => {
            this.logger.debug(response)
            this.router.navigateToRoute("time-entries")
        }).catch((err) => {
            this.logger.error(err)
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
