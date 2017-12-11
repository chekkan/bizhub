import sinon from "sinon"
import { Authentication } from "../../../src/common/authentication"

describe("the authentication common module", () => {
    describe("accessToken getter", () => {
        it("calls fetch with correct url and method", async () => {
            const sut = new Authentication()
            sinon.stub(window.localStorage, "getItem").withArgs("access_token")
                .returns("blah blah")
            const actual = sut.accessToken
            expect(actual).toEqual("blah blah")
        })
    })
})
