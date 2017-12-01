import { inject, Factory } from "aurelia-framework"
import { Router } from "aurelia-router"
import { ApiService } from "../services/api-service"

function nl2br(str, isXhtml) {
    const breakTag = (isXhtml || typeof isXhtml === "undefined") ? "<br  />" : "<br>"
    return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${breakTag}$2`)
}

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
            this.orgService.getById(invoice.organization.id)
            .then((organization) => {
                Object.assign(invoice, {
                    from: {
                        name: invoice.from === undefined ? undefined : invoice.from.name,
                        address: invoice.from === undefined ? undefined : nl2br(invoice.from.address),
                    },
                    recipient: {
                        name: invoice.recipient.name,
                        address: nl2br(invoice.recipient.address),
                    },
                    organization,
                    total: invoice.items.reduce((a, b) => a + b.totalAmount, 0),
                })
                this.invoice = invoice
            })
        })
    }

    print() {
        window.print()
    }
}
