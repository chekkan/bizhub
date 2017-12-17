import sinon from "sinon"
import { AuthorizedHomeViewModel } from "./authorized"
import { ApiService } from "../services/api-service"

describe("home module", () => {
    describe("authorized view model", () => {
        describe("activate", () => {
            let myOrgsService
            let serviceFactory

            beforeEach(() => {
                myOrgsService = sinon.createStubInstance(ApiService)
                serviceFactory = () => myOrgsService
            })

            afterEach(() => {
                myOrgsService.getAll.restore()
            })

            it("shouldShowCreateOrgPrompt returns true when user has no orgs", async () => {
                myOrgsService.getAll.resolves({ totalSize: 0 })
                const sut = new AuthorizedHomeViewModel(serviceFactory)
                await sut.activate()
                expect(sut.shouldShowCreateOrgPrompt).toBeTruthy()
            })

            it("shouldShowCreateOrgPrompt returns false when user has orgs", async () => {
                myOrgsService.getAll.resolves({ totalSize: 10 })
                const sut = new AuthorizedHomeViewModel(serviceFactory)
                await sut.activate()
                expect(sut.shouldShowCreateOrgPrompt).toBeFalsy()
            })

            it("populates myOrgs with response content", async () => {
                const content = [{ foo: "bar" }]
                myOrgsService.getAll.resolves({ content })
                const sut = new AuthorizedHomeViewModel(serviceFactory)
                await sut.activate()
                expect(sut.myOrgs).toBe(content)
            })
        })
    })
})
