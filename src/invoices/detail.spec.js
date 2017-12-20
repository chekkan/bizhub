import sinon from "sinon"
import { ApiService } from "../services/api-service"
import { InvoiceDetailViewModel } from "./detail"

describe("InvoiceDetailViewModel", () => {
    describe("activate", () => {
        it("sets the invoice field to return from invoice svc", async () => {
            const orgService = sinon.createStubInstance(ApiService)
            const invoiceService = sinon.createStubInstance(ApiService)
            const serviceFactory = (resource) => {
                if (resource === "invoice") {
                    return invoiceService
                }
                return orgService
            }
            const invoice = {
                id: 1,
                organization: {
                    id: 2,
                },
                recipient: {
                    address: "foo",
                },
                items: [],
            }
            const params = { id: 1 }
            invoiceService.getById.withArgs(params.id)
                .resolves(invoice)
            orgService.getById.withArgs(invoice.organization.id)
                .resolves(invoice.organization)
            const sut = new InvoiceDetailViewModel({}, serviceFactory)
            await sut.activate(params)
            expect(sut.invoice).toBe(invoice)
        })
    })
})
