import { inject, Factory, LogManager } from "aurelia-framework"
import { Router } from "aurelia-router"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService), Router)
export class NewInvoiceViewModel {

    invoiceEntries = []
    date = null
    orgId = null
    recipient = {}
    payment = null
    invoiceService = null
    router = null
    from = {}

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
            from: {
                name: this.from.name,
                address: this.from.address,
            },
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
            payment: this.payment,
        }
        this.invoiceService.create(newInvoice)
        .then((location) => {
            this.router.navigate(`/invoices/${location}`)
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
