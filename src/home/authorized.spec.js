import { AuthorizedHomeViewModel } from "./authorized"
import { ApiService } from "../services/api-service"

describe("home module", () => {
    describe("authorized view model", () => {
        describe("activate", () => {
            let myOrgsService
            let serviceFactory

            beforeEach(() => {
                myOrgsService = { getAll: jest.fn() }
                serviceFactory = () => myOrgsService
            })

            it("shouldShowCreateOrgPrompt returns true when user has no orgs", async () => {
                myOrgsService.getAll.mockResolvedValue({ totalSize: 0 })
                
                const sut = new AuthorizedHomeViewModel(serviceFactory)
                await sut.activate()
                expect(sut.shouldShowCreateOrgPrompt).toBeTruthy()
            })

            it("shouldShowCreateOrgPrompt returns false when user has orgs", async () => {
                myOrgsService.getAll.mockResolvedValue({ totalSize: 10 })
                const sut = new AuthorizedHomeViewModel(serviceFactory)
                await sut.activate()
                expect(sut.shouldShowCreateOrgPrompt).toBeFalsy()
            })

            it("populates myOrgs with response content", async () => {
                const content = [{ foo: "bar" }]
                myOrgsService.getAll.mockResolvedValue({ content })
                const sut = new AuthorizedHomeViewModel(serviceFactory)
                await sut.activate()
                expect(sut.myOrgs).toBe(content)
            })
        })

        describe("createOrg", () => {
            it("service create called with the organization", async () => {
                const orgService = {
                    create: jest.fn().mockResolvedValue("foo"),
                }
                const router = { navigate: () => {} }
                const serviceFactory = resource => (resource === "organization" ? orgService : null)
                const sut = new AuthorizedHomeViewModel(serviceFactory, router)
                sut.organization = { name: "bar" }
                await sut.createOrg()
                expect(orgService.create).toHaveBeenCalled()
                expect(orgService.create.mock.calls[0][0]).toBe(sut.organization)
            })

            it("navigates to org details route after successfull creation", async () => {
                const orgId = "foo"
                const orgService = {
                    create: () => Promise.resolve(orgId),
                }
                const router = { navigate: jest.fn() }
                const serviceFactory = resource => (resource === "organization" ? orgService : null)

                const sut = new AuthorizedHomeViewModel(serviceFactory, router)
                await sut.createOrg()
                expect(router.navigate).toHaveBeenCalled()
                expect(router.navigate.mock.calls[0][0]).toEqual(`/organizations/${orgId}`)
            })
        })
    })
})
