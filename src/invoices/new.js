import { inject, Factory } from "aurelia-framework"
import moment from "moment"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService))
export class NewInvoiceViewModel {
    timeEntries = []
    selectedEntries = []

    constructor(apiService) {
        this.timeEntryService = apiService("time-entry")
        this.orgService = apiService("organization")
        this.officeService = apiService("office")
    }

    async activate() {
        const self = this
        return this.timeEntryService.getAll(10, 0)
        .then((response) => {
            const resources = response.content
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
                    id: resource.id,
                    start: resource.start,
                    end: resource.end,
                    break: moment.duration(resource.break, "minutes").humanize().replace("minute", "min"),
                    ratePerHour: resource.ratePerHour,
                    organization: orgs.filter(o => o.id === resource.organization.id)[0],
                    office: offices.filter(o => o.id === resource.office.id)[0],
                }))
            })
        })
    }

    selectCard(entry) {
        const index = this.selectedEntries.indexOf(entry.id)
        if (index > -1) {
            this.selectedEntries.splice(index, 1)
            this.timeEntries.find(e => e.id === entry.id).selected = false
        } else {
            this.timeEntries.find(e => e.id === entry.id).selected = true
            this.selectedEntries.push(entry.id)
        }
    }
}
