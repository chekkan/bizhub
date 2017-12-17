import { HttpClient, json } from "aurelia-fetch-client"
import sinon from "sinon"
import "jasmine-sinon"
import { ApiService } from "./api-service"

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
            const client = sinon.createStubInstance(HttpClient)
            client.fetch.resolves({ headers: new Headers() })
            const sut = new ApiService(client, "organization")
            await sut.create({ name: "bizhub" })
            expect(client.fetch).toHaveBeenCalledWith(
                "/organizations",
                jasmine.objectContaining({ method: "post" }),
            )
        })

        it("calls fetch with correct body", async () => {
            const body = { name: "bizhub" }
            const client = sinon.createStubInstance(HttpClient)
            client.fetch.resolves({ headers: new Headers() })
            const sut = new ApiService(client, "organization")
            await sut.create(body)
            expect(client.fetch).toHaveBeenCalledWith(
                "/organizations",
                jasmine.objectContaining({ body: json(body) }),
            )
        })

        it("rejects with error", (done) => {
            const body = { }
            const client = sinon.createStubInstance(HttpClient)
            const error = new Error()
            error.json = () => Promise.resolve(new Error())
            client.fetch.rejects(error)

            const sut = new ApiService(client, "organization")
            sut.create(body).catch(() => {
                done()
            })
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
