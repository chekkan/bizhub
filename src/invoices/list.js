import { inject, Factory, LogManager } from "aurelia-framework"
import { activationStrategy } from "aurelia-router"
import { ApiService } from "../services/api-service"
import { ListViewModel } from "../common/list-view-model"

@inject(activationStrategy, Factory.of(ApiService))
export class InvoicesListViewModel extends ListViewModel {
    invoices = []

    constructor(actStrategy, apiService) {
        super(actStrategy, apiService("invoice"))
        this.timeEntryService = apiService("time-entry")
        this.orgService = apiService("organization")
        this.officeService = apiService("office")
        this.logger = LogManager.getLogger("InvoicesListViewModel")
    }

    async activate(params) {
        return super.activate(params)
        .then((invoices) => {
            const timeEntryIds = invoices.map(inv => inv.timeEntries.map(te => te.id))
                .reduce((acc, val) => [...acc, ...val], [])
                .filter((v, i, a) => a.indexOf(v) === i)

            const organizationIds = invoices.map(inv => inv.recipient.organization.id)
                .filter((v, i, a) => a.indexOf(v) === i)

            const officeIds = invoices.map(inv => inv.recipient.office.id)
                .filter((v, i, a) => a.indexOf(v) === i)

            const tePromise = this.timeEntryService.getAll(timeEntryIds.length, 0, {
                id: timeEntryIds,
            }).then(teRes => teRes.content)

            const orgPromise = this.orgService.getAll(organizationIds.length, 0, {
                id: organizationIds,
            }).then(orgRes => orgRes.content)

            const officePromise = this.officeService.getAll(officeIds.length, 0, {
                id: officeIds,
            }).then(officeRes => officeRes.content)

            return Promise.all([tePromise, orgPromise, officePromise])
            .then((responses) => {
                const timeEntries = responses[0]
                const organizations = responses[1]
                const offices = responses[2]
                return invoices.map(inv => Object.assign({}, inv, {
                    timeEntries: inv.timeEntries
                        .map(te => timeEntries.filter(entry => entry.id === te.id)[0]),
                    recipient: {
                        organization: organizations
                            .filter(org => org.id === inv.recipient.organization.id)[0],
                        office: offices.filter(o => o.id === inv.recipient.office.id)[0],
                    },
                }))
            })
        })
        .then((invoices) => {
            this.logger.debug(invoices)
            return invoices.map(inv => Object.assign({}, inv, {
                totalAmount: inv.timeEntries.reduce((acc, val) => {
                    const msInHours = (1000 * 60 * 60)
                    const breakInHrs = val.break / 60
                    const workTimeInMs = new Date(val.end) - new Date(val.start)
                    const totalHours = (workTimeInMs / msInHours) - (breakInHrs)
                    return (acc + (totalHours * val.ratePerHour))
                }, 0),
            }))
        })
        .then((invoices) => {
            this.invoices = invoices
        })
    }
}
