import { Authentication } from "./authentication"

describe("the authentication common module", () => {
    let store = {};
    
    beforeEach(() => {
        global.localStorage = {
            getItem: (key) => store[key]
        }
        Object.defineProperty(window, 'localStorage', { 
            value: global.localStorage, 
            configurable:true,
            enumerable:true,
            writable:true 
        });
    })
    
    describe("accessToken getter", () => {
        it("calls fetch with correct url and method", () => {
            store["access_token"]= "blah blah"

            const sut = new Authentication()
            const actual = sut.accessToken
            
            expect(actual).toEqual("blah blah")
        })
    })

    describe("isAuthenticated getter", () => {
        it("returns false if id_token not in local storage", () => {
            const sut = new Authentication()
            expect(sut.isAuthenticated).toBeFalsy()
        })

        it("json parse error returns false", () => {
            const payload = "invalid json"
            const base64payload = window.btoa(payload)
            store["id_token"] = `eyJ0eXA.${base64payload}.j_7ncop-PfaCz`
            
            const sut = new Authentication()
            expect(sut.isAuthenticated).toBeFalsy()
        })

        it("expired token returns false", () => {
            const payload = JSON.stringify({
                exp: Math.round(new Date().getTime() / 1000) - 30,
            })
            const base64payload = window.btoa(payload)
            store["id_token"] = `eyJ0eXA.${base64payload}.j_7ncop-PfaCz`

            const sut = new Authentication()
            expect(sut.isAuthenticated).toBeFalsy()
        })

        it("return false when nonce in payload doesnt match", () => {
            const payload = JSON.stringify({
                exp: Math.round(new Date().getTime() / 1000) + 50,
                nonce: "something",
            })
            const base64payload = window.btoa(payload)
            store["id_token"] = `eyJ0eXA.${base64payload}.j_7ncop-PfaCz`
            store["nonce"] = "something else"

            const sut = new Authentication()
            expect(sut.isAuthenticated).toBeFalsy()
        })

        it("return true when nonce in payload matches with stored nonce", () => {
            const payload = JSON.stringify({
                exp: Math.round(new Date().getTime() / 1000) + 50,
                nonce: "something",
            })
            const base64payload = window.btoa(payload)
            store["id_token"] = `eyJ0eXA.${base64payload}.j_7ncop-PfaCz`
            store["nonce"] = "something"

            const sut = new Authentication()
            expect(sut.isAuthenticated).toBeTruthy()
        })
    })
})
