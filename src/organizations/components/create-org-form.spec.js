import { StageComponent } from "aurelia-testing"
import { bootstrap } from "aurelia-bootstrapper"
import sinon from "sinon"
import { CreateOrgFormCustomElement } from "./create-org-form"

describe("create-org-form", () => {
    let component
    beforeAll((done) => {
        component = StageComponent.withResources().inView("<div></div>").boundTo({})
        component.bootstrap(aurelia => aurelia.use.standardConfiguration().plugin("aurelia-validation"))
        component.create(bootstrap).then(done)
    })

    afterAll(() => {
        component.dispose()
    })

    describe("create org", () => {
        let element
        let controller
        beforeEach(() => {
            element = sinon.createStubInstance(Element)
            controller = { validate: () => {} }
        })

        it("emit submit event when validation passes", async () => {
            sinon.stub(controller, "validate").resolves({ valid: true })
            const sut = new CreateOrgFormCustomElement(element, controller)
            await sut.createOrg()
            expect(element.dispatchEvent).toHaveBeenCalled()
            const event = element.dispatchEvent.lastCall.args[0]
            expect(event instanceof CustomEvent).toBeTruthy()
            expect(event.type).toEqual("submit")
            expect(event.bubbles).toBeFalsy()
        })

        it("doesn't emit submit event when validation fails", async () => {
            sinon.stub(controller, "validate").resolves({ valid: false })
            const sut = new CreateOrgFormCustomElement(element, controller)
            await sut.createOrg()
            expect(element.dispatchEvent).not.toHaveBeenCalled()
        })
    })
})
