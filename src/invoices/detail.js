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
    }

    activate(params) {
        return this.invoiceService.getById(params.id)
        .then((invoice) => {
            this.timeEntryService.getAll(invoice.timeEntries.length, 0, {
                id: invoice.timeEntries.map(te => te.id),
            }).then((response) => {
                const timeEntries = response.content.map((te) => {
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
            })
        })
    }
}
