import { App } from "../../src/app"

class RouterStub {
    constructor() {
        this.options = {}
    }

    configure(handler) {
        handler(this)
    }

    map(routes) {
        this.routes = routes
    }

    mapUnknownRoutes(route) {
        this.unKnownRoute = route
    }

    addPipelineStep() {} // eslint-disable-line class-methods-use-this
}

describe("the App module", () => {
    let sut
    let mockedRouter

    beforeEach(() => {
        mockedRouter = new RouterStub()
        sut = new App()
        sut.configureRouter(mockedRouter, mockedRouter)
    })

    it("contains a router property", () => {
        expect(sut.router).toBeDefined()
    })

    it("configures the router title", () => {
        expect(sut.router.title).toEqual("Bizhub")
    })

    it("should have a home route", () => {
        expect(sut.router.routes).toContain({
            route: ["", "home"],
            name: "home",
            title: "Home",
            moduleId: "home/index",
        })
    })

    it("should have a not-found route", () => {
        expect(sut.router.unKnownRoute).toEqual("not-found")
    })
})
