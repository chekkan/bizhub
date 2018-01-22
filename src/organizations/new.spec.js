import sinon from "sinon"
import { NewOrgViewModel } from "./new"

describe("new org view model", () => {
    describe("createOrg", () => {
        it("navigates to org details route after successfull creation", async () => {
            const orgService = {
                create: () => Promise.resolve("foo"),
            }
            const router = { navigateToRoute: () => {} }
            sinon.spy(router, "navigateToRoute")
            const serviceFactory = () => orgService
            const sut = new NewOrgViewModel(serviceFactory, router)
            await sut.createOrg()
            expect(router.navigateToRoute).toHaveBeenCalled()
            expect(router.navigateToRoute.lastCall.args[0]).toEqual("organizationDetail")
            expect(router.navigateToRoute.lastCall.args[1]).toEqual({ id: "foo" })
        })
    })
})
