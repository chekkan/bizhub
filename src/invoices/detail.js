import { inject, Factory } from "aurelia-framework"
import { Router } from "aurelia-router"
import { ApiService } from "../services/api-service"

@inject(Router, Factory.of(ApiService))
export class Detail {

    invoice = {}

    constructor(router, apiService) {
        this.router = router
        this.invoiceService = apiService("invoice")
        this.timeEntryService = apiService("time-entry")
        this.orgService = apiService("organization")
        this.officeService = apiService("office")
    }

    activate(params) {
        return this.invoiceService.getById(params.id)
        .then((invoice) => {
            this.invoice = invoice
            return this.timeEntryService.getAll(invoice.timeEntries.length, 0, {
                id: invoice.timeEntries.map(te => te.id),
            })
        })
        .then(response => response.content)
        .then((timeEntries) => {
            this.invoice.timeEntries = timeEntries

            const organizationIds = timeEntries.map(te => te.organization.id)
                .concat(this.invoice.recipient.organization.id)
                .filter((v, i, a) => a.indexOf(v) === i)

            const officeIds = timeEntries.map(te => te.office.id)
                .concat(this.invoice.recipient.office.id)
                .filter((v, i, a) => a.indexOf(v) === i)

            const orgsPromise = this.orgService.getAll(organizationIds.length, 0, {
                id: organizationIds,
            }).then(orgRes => orgRes.content)

            const officesPromise = this.officeService.getAll(officeIds.length, 0, {
                id: officeIds,
            }).then(orgRes => orgRes.content)

            return Promise.all([orgsPromise, officesPromise])
        })
        .then((timeEntryChildResponses) => {
            const organizations = timeEntryChildResponses[0]
            const offices = timeEntryChildResponses[1]

            this.invoice.recipient.organization = organizations
                .filter(org => org.id === this.invoice.recipient.organization.id)[0]
            this.invoice.recipient.office = offices
                .filter(off => off.id === this.invoice.recipient.office.id)[0]

            this.invoice.timeEntries = this.invoice.timeEntries.map((te) => {
                const msInHours = 1000 * 60 * 60
                const breakInHrs = te.break / 60
                const workTimeInMs = new Date(te.end) - new Date(te.start)
                const totalHours = (workTimeInMs / msInHours) - (breakInHrs)
                return {
                    start: te.start,
                    end: te.end,
                    ratePerHour: te.ratePerHour,
                    billableHours: totalHours,
                    totalAmount: (totalHours * te.ratePerHour),
                    organization: organizations.filter(org => org.id === te.organization.id)[0],
                    office: offices.filter(off => off.id === te.office.id)[0],
                }
            })
        })
    }
}
