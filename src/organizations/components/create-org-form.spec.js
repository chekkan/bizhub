import { StageComponent } from "aurelia-testing"
import { bootstrap } from "aurelia-bootstrapper"
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
            element = { dispatchEvent: jest.fn() }
            controller = { validate: jest.fn() }
        })

        it("emit submit event when validation passes", async () => {
            controller.validate.mockResolvedValue({ valid: true })
            const sut = new CreateOrgFormCustomElement(element, controller)

            await sut.createOrg()
            
            expect(element.dispatchEvent).toHaveBeenCalled()
            const event = element.dispatchEvent.mock.calls[0][0]
            expect(event instanceof CustomEvent).toBeTruthy()
            expect(event.type).toEqual("submit")
            expect(event.bubbles).toBeFalsy()
        })

        it("doesn't emit submit event when validation fails", async () => {
            controller.validate.mockResolvedValue({ valid: false })

            const sut = new CreateOrgFormCustomElement(element, controller)
            await sut.createOrg()
            expect(element.dispatchEvent).not.toHaveBeenCalled()
        })
    })
})
