import { json } from "aurelia-fetch-client"
import { ApiService } from "../../../src/services/api-service"

class HttpClientMock {
    href;
    method;
    data;

    fetch(href, params) {
        this.href = href
        if (params) {
            this.method = params.method || "get"
            this.body = params.body
        } else {
            this.method = "get"
        }
        if (this.method === "get") {
            const self = this
            const response = {
                json() {
                    return self.data
                },
            }
            return Promise.resolve(response)
        }
        return Promise.resolve()
    }
}

describe("the ApiSerivce module", () => {
    describe("create method", () => {
        it("calls fetch with correct url and method", async () => {
            const client = new HttpClientMock()
            const sut = new ApiService(client, "organization")
            await sut.create({ name: "bizhub" })
            expect(client.href).toEqual("/organizations")
            expect(client.method).toEqual("post")
        })

        it("calls fetch with correct body", async () => {
            const body = { name: "bizhub" }
            const client = new HttpClientMock()
            const sut = new ApiService(client, "organization")
            await sut.create(body)
            expect(client.body).toEqual(json(body))
        })
    })

    describe("getById method", () => {
        it("calls fetch with correct url", async () => {
            const client = new HttpClientMock()
            const id = "bar"
            const sut = new ApiService(client, "organization")
            await sut.getById(id)
            expect(client.href).toEqual(`/organizations/${id}`)
            expect(client.method).toEqual("get")
        })

        it("returns expected json response", async () => {
            const data = {
                name: "foo",
            }
            const client = new HttpClientMock()
            client.data = data
            const id = "baz"
            const sut = new ApiService(client, "organization")
            const actual = await sut.getById(id)
            expect(actual).toEqual(data)
        })
    })

    describe("delete method", () => {
        it("calls fetch with correct url and method", async () => {
            const client = new HttpClientMock()
            const id = "foo"
            const sut = new ApiService(client, "organization")
            await sut.delete(id)
            expect(client.href).toEqual(`/organizations/${id}`)
            expect(client.method).toEqual("delete")
        })
    })
})
