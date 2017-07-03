import { inject, Factory } from "aurelia-framework"
import { activationStrategy } from "aurelia-router"
import moment from "moment"
import { ApiService } from "../services/api-service"
import { ListViewModel } from "../common/list-view-model"

@inject(activationStrategy, Factory.of(ApiService))
export class TimeEntriesListViewModel extends ListViewModel {

    timeEntries = []

    constructor(actStrategy, apiService) {
        super(actStrategy, apiService("time-entry"))
        this.orgService = apiService("organization")
        this.officeService = apiService("office")
    }

    async activate(params) {
        const self = this
        return super.activate(params)
        .then((resources) => {
            const orgIds = resources.map(resource => resource.organization.id)
                .filter((v, i, a) => a.indexOf(v) === i)
            const officeIds = resources.map(resource => resource.office.id)
                .filter((v, i, a) => a.indexOf(v) === i)

            const orgsPromise = this.orgService.getAll(orgIds.length, 0, { id: orgIds })
            const officesPromise = this.officeService.getAll(officeIds.length, 0, { id: officeIds })

            Promise.all([orgsPromise, officesPromise]).then((values) => {
                const orgs = values[0].content
                const offices = values[1].content

                self.timeEntries = resources.map(resource => ({
                    start: resource.start,
                    hours: Math.abs(
                        Date.parse(resource.end) - Date.parse(resource.start),
                    ) / 36e5,
                    break: moment.duration(resource.break, "minutes").humanize(),
                    ratePerHour: resource.ratePerHour,
                    organization: orgs.filter(o => o.id === resource.organization.id)[0],
                    office: offices.filter(o => o.id === resource.office.id)[0],
                }))
            })
        })
    }
}
