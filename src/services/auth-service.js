import { inject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"

@inject(HttpClient)
export class AuthService {

    config = {
        loginRedirect: "/",
        loginRoute: "/login",
    }

    constructor(httpClient) {
        this.httpClient = httpClient
        this.baseUrl = "https://bizhub.eu.auth0.com/"
    }

    register(model) {
        const postData = Object.assign({}, model, {
            client_id: "FADvfi3XwGOe5NLT7zDXjthJ3WgwPIQU",
            connection: "Username-Password-Authentication",
        })
        return this.httpClient.fetch(`${this.baseUrl}dbconnections/signup`, {
            method: "post",
            body: json(postData),
        })
    }

    get isAuthenticated() {
        const idToken = localStorage.getItem("id_token")
        if (!idToken) {
            return false
        }
        let exp
        try {
            const base64Url = idToken.split(".")[1]
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
            exp = JSON.parse(window.atob(base64)).exp
        } catch (error) {
            return false
        }

        if (exp) {
            return Math.round(new Date().getTime() / 1000) <= exp
        }

        return true
    }

    login(token) {
        localStorage.setItem("access_token", token.access_token)
        localStorage.setItem("expires_in", token.expires_in)
        localStorage.setItem("token_type", token.token_type)
        localStorage.setItem("id_token", token.id_token)
        return Promise.resolve()
    }

    logout() {
        localStorage.removeItem("access_token")
        localStorage.removeItem("expires_in")
        localStorage.removeItem("token_type")
        localStorage.removeItem("id_token")
        return Promise.resolve()
    }
}
