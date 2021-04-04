import { Redirect } from "aurelia-router"
import { AuthenticateStep } from "./authenticate-step"

describe("AuthenticateStep", () => {
    describe("run", () => {
        let authService
        let navInstruction
        let next

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

            next = jest.fn(() => {})
            next.cancel = jest.fn(() => {})
        })

        it("calls next when no navigation instructions require auth", () => {
            navInstruction.getAllInstructions = () => ([{
                config: { auth: false },
            }])

            const sut = new AuthenticateStep(authService)
            sut.run(navInstruction, next)
            expect(next).toHaveBeenCalled()
        })

        it("redirects to logRoute when not logged in", () => {
            const sut = new AuthenticateStep(authService)
            sut.run(navInstruction, next)
            expect(next.cancel.mock.calls[0][0] instanceof Redirect).toBeTruthy()
            expect(next.cancel.mock.calls.[0][0].url).toEqual("/login")
        })

        it("calls next when logged in", () => {
            authService.isAuthenticated = true

            const sut = new AuthenticateStep(authService)
            sut.run(navInstruction, next)
            expect(next).toHaveBeenCalled()
        })
    })
})
