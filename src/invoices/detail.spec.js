import { ApiService } from "../services/api-service"
import { InvoiceDetailViewModel } from "./detail"

describe("InvoiceDetailViewModel", () => {
    describe("activate", () => {
        it("sets the invoice field to return from invoice svc", async () => {
            const orgService = { getById: jest.fn() }
            const invoiceService = { getById: jest.fn() }
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
            invoiceService.getById.mockResolvedValue(invoice);
            orgService.getById.mockResolvedValue(invoice.organization);
            
            const sut = new InvoiceDetailViewModel({}, serviceFactory)
            await sut.activate(params)
            expect(sut.invoice).toBe(invoice)
            expect(invoiceService.getById).toHaveBeenCalledWith(params.id);
            expect(orgService.getById).toHaveBeenCalledWith(invoice.organization.id);
        })
    })
})
