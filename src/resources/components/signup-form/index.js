import { inject, NewInstance } from "aurelia-framework"
import { ValidationController, ValidationRules } from "aurelia-validation"
import { Auth0Service } from "./auth0-service"

@inject(NewInstance.of(ValidationController), Auth0Service)
export class SignupFormCustomElement {

    controller = null

    constructor(controller, auth0Service) {
        this.controller = controller
        this.auth0Service = auth0Service

        ValidationRules
        .ensure("email")
            .required()
            .email()
        .ensure("password")
            .required()
            .minLength(8)
            .on(this)
    }

    email = ""
    password = ""

    join() {
        const newUser = { email: this.email, password: this.password }
        return this.auth0Service.signup(newUser).then(() => {
            console.log("success")
        }).catch(() => {
            console.log("failed")
        })
    }

}
