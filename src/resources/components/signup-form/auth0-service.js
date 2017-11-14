import { inject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "../../../services/auth-service"

@inject(AuthService)
export class Auth0Service {
    constructor(authService) {
        this.authService = authService
        this.client = new HttpClient()
    }

    signup(body) {
        Object.assign(body, {
            client_id: this.authService.config.clientId,
            connection: this.authService.config.connectionName,
        })
        return this.client.fetch(this.authService.config.signupUrl, {
            method: "post",
            body: json(body),
        })
        .then(response => response.json())
        .then((data) => {
            // Bad Request
            if (data.statusCode === 400) {
                // return sucess if user exists
                // so that a false pretense user will not know
                // if an email is a registered account
                // this should be checked last
                if (data.code === "user_exists") {
                    return Promise.resolve()
                }
                return Promise.reject()
            }
            return Promise.resolve()
        })
    }
}
