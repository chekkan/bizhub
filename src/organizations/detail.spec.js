import { ApiService } from "../services/api-service"
import { OrgDetailViewModel } from "./detail"

describe("organizations modules", () => {
    describe("detail view model", () => {
        let orgsService
        let serviceFactory
        const route = { navModel: {} }

        beforeEach(() => {
            orgsService = { getById: jest.fn() }
            serviceFactory = () => orgsService
        })

        it("activate sets route navModel title to org name", async () => {
            orgsService.getById.mockResolvedValue({ name: "foo" })
            const sut = new OrgDetailViewModel({}, serviceFactory)

            await sut.activate({}, route)
            expect(route.navModel.title).toBe("foo")
        })

        it("activate sets organization field", async () => {
            const org = { id: 1, name: "foo" }
            const param = { id: org.id }
            orgsService.getById.mockResolvedValue(org)
            // (sinon.match.number).resolves(org)
            const sut = new OrgDetailViewModel({}, serviceFactory)
            
            await sut.activate(param, route)
            expect(sut.organization).toBe(org)
            expect(orgsService.getById).toHaveBeenCalledWith(org.id)
        })
    })
})
