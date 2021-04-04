import { NewOrgViewModel } from "./new"

describe("new org view model", () => {
    describe("createOrg", () => {
        it("navigates to org details route after successfull creation", async () => {
            const orgService = {
                create: () => Promise.resolve("foo"),
            }
            const router = { navigateToRoute: jest.fn() }
            const serviceFactory = () => orgService
            
            const sut = new NewOrgViewModel(serviceFactory, router)
            await sut.createOrg()
            
            expect(router.navigateToRoute).toHaveBeenCalled()
            expect(router.navigateToRoute).toHaveBeenCalledWith("organizationDetail", { id: "foo" })
        })
    })
})
