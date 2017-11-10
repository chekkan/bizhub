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
            const tePromise = this.timeEntryService.getAll(invoice.timeEntries.length, 0, {
                id: invoice.timeEntries.map(te => te.id),
            }).then(response => response.content)
            const orgPromise = this.orgService.getById(invoice.recipient.organization.id)
            const officePromise = this.officeService.getById(invoice.recipient.office.id)
            
            return Promise.all([tePromise, orgPromise, officePromise])
            .then((responses) => {
                const timeEntries = responses[0]
                const organization = responses[1]
                const office = responses[2]

                timeEntries.map((te) => {
                    const msInHours = 1000 * 60 * 60
                    const breakInHrs = te.break / 60
                    const workTimeInMs = new Date(te.end) - new Date(te.start)
                    const totalHours = (workTimeInMs / msInHours) - (breakInHrs)
                    return {
                        start: te.start,
                        end: te.end,
                        totalAmount: (totalHours * te.ratePerHour),
                    }
                })
                this.invoice = invoice
                this.invoice.timeEntries = timeEntries
                this.invoice.recipient.organization = organization
                this.invoice.recipient.office = office
            })
        })
    }
}
