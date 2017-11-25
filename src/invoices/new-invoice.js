import { inject, Factory, LogManager } from "aurelia-framework"
import { Router } from "aurelia-router"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService), Router)
export class NewInvoiceViewModel {

    invoiceEntries = []
    date = null
    orgId = null
    recipient = {}
    invoiceService = null
    router = null

    constructor(apiService, router) {
        this.date = new Date().toISOString().slice(0, 10)
        this.logger = LogManager.getLogger("NewInvoiceViewModel")
        this.invoiceService = apiService("invoice")
        this.router = router
    }

    async activate(params) {
        this.orgId = params.orgId
    }

    createInvoice() {
        const newInvoice = {
            organization: {
                id: this.orgId,
            },
            date: this.date,
            recipient: {
                name: this.recipient.name,
                address: this.recipient.address,
            },
            items: this.invoiceEntries.map(i => ({
                date: i.date,
                billableHours: Number(i.billableHours),
                totalAmount: Number(i.totalAmount),
                client: i.client,
            })),
        }
        this.invoiceService.create(newInvoice)
        .then((response) => {
            this.logger.debug(response)
            this.router.navigateToRoute("organizations")
        }).catch((err) => {
            this.logger.error(err)
        })
    }

    addTimeEntry() {
        this.invoiceEntries.push({
            date: new Date().toISOString().slice(0, 10),
        })
    }
}
