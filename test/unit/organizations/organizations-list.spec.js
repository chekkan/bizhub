import { Index } from "../../../src/organizations"

class ApiServiceStub {
    itemStubs

    getAll() {
        const response = {
            content: this.itemStubs,
        }
        return Promise.resolve(response)
    }
}

describe("the OrganizationsIndex module", () => {
    it("set fetch response to organizations", async () => {
        const itemStubs = [{ id: "dsds", name: "something" }, { id: "eeds", name: "github" }]

        const apiServiceMock = () => {
            const http = new ApiServiceStub()
            http.itemStubs = itemStubs
            return http
        }

        const sut = new Index(null, apiServiceMock)

        await sut.activate()
        expect(sut.organizations).toBe(itemStubs)
    })
})
