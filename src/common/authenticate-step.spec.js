import sinon from "sinon"
import "jasmine-sinon"
import { Redirect } from "aurelia-router"
import { AuthenticateStep } from "./authenticate-step"

describe("AuthenticateStep", () => {
    describe("run", () => {
        let authService
        let navInstruction

        beforeEach(() => {
            authService = {
                isAuthenticated: false,
                config: {
                    loginRoute: "/login",
                },
            }

            navInstruction = {
                getAllInstructions: () => ([{
                    config: {
                        auth: true,
                    },
                }]),
            }
        })

        it("calls next when no navigation instructions require auth", () => {
            navInstruction.getAllInstructions = () => ([{
                config: { auth: false },
            }])
            const next = sinon.spy()

            const sut = new AuthenticateStep(authService)
            sut.run(navInstruction, next)
            expect(next).toHaveBeenCalled()
        })

        it("redirects to logRoute when not logged in", () => {
            const next = () => {}
            next.cancel = () => {}
            sinon.spy(next, "cancel")

            const sut = new AuthenticateStep(authService)
            sut.run(navInstruction, next)
            expect(next.cancel.lastCall.args[0] instanceof Redirect).toBeTruthy()
            expect(next.cancel.lastCall.args[0].url).toEqual("/login")
        })

        it("calls next when logged in", () => {
            authService.isAuthenticated = true
            const next = sinon.spy()

            const sut = new AuthenticateStep(authService)
            sut.run(navInstruction, next)
            expect(next).toHaveBeenCalled()
        })
    })
})
