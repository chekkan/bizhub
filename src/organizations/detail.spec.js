import sinon from "sinon"
import { ApiService } from "../services/api-service"
import { OrgDetailViewModel } from "./detail"

describe("organizations modules", () => {
    describe("detail view model", () => {
        let orgsService
        let serviceFactory
        const route = { navModel: {} }

        beforeEach(() => {
            orgsService = sinon.createStubInstance(ApiService)
            serviceFactory = () => orgsService
        })

        afterEach(() => {
            orgsService.getById.restore()
        })

        it("activate sets route navModel title to org name", async () => {
            orgsService.getById.resolves({ name: "foo" })
            const sut = new OrgDetailViewModel({}, serviceFactory)
            await sut.activate({}, route)
            expect(route.navModel.title).toBe("foo")
        })

        it("activate sets organization field", async () => {
            const org = { id: 1, name: "foo" }
            const param = { id: org.id }
            orgsService.getById.withArgs(sinon.match.number)
                .resolves(org)
            const sut = new OrgDetailViewModel({}, serviceFactory)
            await sut.activate(param, route)
            expect(sut.organization).toBe(org)
        })
    })
})
