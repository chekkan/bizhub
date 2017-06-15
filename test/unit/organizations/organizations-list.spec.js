import { activationStrategy } from "aurelia-router"
import { OrganizationsIndex } from "../../../src/organizations"

class ApiServiceStub {
    itemStubs;

    getAll() {
        const response = {
            content: this.itemStubs,
        }
        return Promise.resolve(response)
    }
}

describe("the OrganizationsIndex module", () => {
    it("set fetch response to organizations", async () => {
        const itemStubs = [
      { id: "dsds", name: "something" },
      { id: "eeds", name: "github" },
        ]

        const apiServiceMock = () => {
            const http = new ApiServiceStub()
            http.itemStubs = itemStubs
            return http
        }

        const sut = new OrganizationsIndex(null, null, apiServiceMock)

        await sut.activate()
        expect(sut.organizations).toBe(itemStubs)
    })

    it("call with page sets currentPage on activate", async () => {
        const page = 3
        const apiServiceMock = () => new ApiServiceStub()

        const sut = new OrganizationsIndex(null, null, apiServiceMock)
        await sut.activate({ page })

        expect(sut.currentPage).toEqual(page)
    })

    it("determineActivationStrategy return invokeLifecycle activationStrategy", () => {
        const actual = new OrganizationsIndex(null, activationStrategy, () => {})
            .determineActivationStrategy()
        expect(actual).toEqual(activationStrategy.invokeLifecycle)
    })

    it("call without page sets currentPage to 1 on activate", async () => {
        const apiServiceMock = () => new ApiServiceStub()

        const sut = new OrganizationsIndex(null, null, apiServiceMock)
        sut.currentPage = 2
        await sut.activate()

        expect(sut.currentPage).toEqual(1)
    })
})
