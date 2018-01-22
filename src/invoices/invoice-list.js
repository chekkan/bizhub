import { inject, Factory } from "aurelia-framework"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService))
export class InvoiceListCustomElement {
    invoices = []
    organizationId = null

    constructor(apiService) {
        this.orgService = apiService("organization")
    }

    async activate(params) {
        this.organizationId = params.id
        return this.orgService.getChild(this.organizationId, "invoices")
            .then((data) => {
                this.invoices = data.content.map(i => Object.assign({}, {
                    totalAmount: i.items.map(o => o.totalAmount)
                        .reduce((total, num) => total + num),
                }, i))
            })
    }
}
