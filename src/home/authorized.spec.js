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

        describe("createOrg", () => {
            it("service create called with the organization", async () => {
                const orgService = {
                    create: () => Promise.resolve("foo"),
                }
                sinon.spy(orgService, "create")
                const router = { navigate: () => {} }
                const serviceFactory = resource => (resource === "organization" ? orgService : null)
                const sut = new AuthorizedHomeViewModel(serviceFactory, router)
                sut.organization = { name: "bar" }
                await sut.createOrg()
                expect(orgService.create).toHaveBeenCalled()
                expect(orgService.create.lastCall.args[0]).toBe(sut.organization)
            })

            it("navigates to org details route after successfull creation", async () => {
                const orgId = "foo"
                const orgService = {
                    create: () => Promise.resolve(orgId),
                }
                const router = { navigate: () => {} }
                sinon.spy(router, "navigate")
                const serviceFactory = resource => (resource === "organization" ? orgService : null)
                const sut = new AuthorizedHomeViewModel(serviceFactory, router)
                await sut.createOrg()
                expect(router.navigate).toHaveBeenCalled()
                expect(router.navigate.lastCall.args[0]).toEqual(`/organizations/${orgId}`)
            })
        })
    })
})
