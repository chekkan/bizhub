import sinon from "sinon"
import { Authentication } from "./authentication"

describe("the authentication common module", () => {
    describe("accessToken getter", () => {
        afterEach(() => {
            window.localStorage.getItem.restore()
        })

        it("calls fetch with correct url and method", () => {
            const sut = new Authentication()
            sinon.stub(window.localStorage, "getItem").withArgs("access_token")
                .returns("blah blah")
            const actual = sut.accessToken
            expect(actual).toEqual("blah blah")
        })
    })

    describe("isAuthenticated getter", () => {
        let getItemFromStorageStub
        beforeEach(() => {
            getItemFromStorageStub = sinon.stub(window.localStorage, "getItem")
        })
        afterEach(() => {
            getItemFromStorageStub.restore()
        })

        it("returns false if id_token not in local storage", () => {
            const sut = new Authentication()
            getItemFromStorageStub.withArgs("id_token")
                .returns(undefined)
            expect(sut.isAuthenticated).toBeFalsy()
        })

        it("json parse error returns false", () => {
            const payload = "invalid json"
            const base64payload = window.btoa(payload)
            const sut = new Authentication()
            getItemFromStorageStub.withArgs("id_token")
                .returns(`eyJ0eXA.${base64payload}.j_7ncop-PfaCz`)
            expect(sut.isAuthenticated).toBeFalsy()
        })

        it("expired token returns false", () => {
            const payload = JSON.stringify({
                exp: Math.round(new Date().getTime() / 1000) - 30,
            })
            const base64payload = window.btoa(payload)
            const sut = new Authentication()
            getItemFromStorageStub.withArgs("id_token")
                .returns(`eyJ0eXA.${base64payload}.j_7ncop-PfaCz`)
            expect(sut.isAuthenticated).toBeFalsy()
        })

        it("return false when nonce in payload doesnt match", () => {
            const payload = JSON.stringify({
                exp: Math.round(new Date().getTime() / 1000) + 50,
                nonce: "something",
            })
            const base64payload = window.btoa(payload)
            const sut = new Authentication()
            getItemFromStorageStub.withArgs("id_token")
                .returns(`eyJ0eXA.${base64payload}.j_7ncop-PfaCz`)
                .withArgs("nonce").returns("something else")
            expect(sut.isAuthenticated).toBeFalsy()
        })

        it("return true when nonce in payload matches with stored nonce", () => {
            const payload = JSON.stringify({
                exp: Math.round(new Date().getTime() / 1000) + 50,
                nonce: "something",
            })
            const base64payload = window.btoa(payload)
            const sut = new Authentication()
            getItemFromStorageStub.withArgs("id_token")
                .returns(`eyJ0eXA.${base64payload}.j_7ncop-PfaCz`)
            getItemFromStorageStub.withArgs("nonce")
                .returns("something")
            expect(sut.isAuthenticated).toBeTruthy()
        })
    })
})
