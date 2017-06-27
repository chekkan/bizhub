import { inject } from "aurelia-framework"
import { Router } from "aurelia-router"
import { HttpClient, json } from "aurelia-fetch-client"
import { AureliaConfiguration } from "aurelia-configuration"

@inject(HttpClient, AureliaConfiguration, Router)
export class AuthService {
    constructor(httpClient, configuration, router) {
        this.httpClient = httpClient
        this.router = router
        this.config = {
            authEndpoint: configuration.get("auth.authEndpoint"),
            clientId: configuration.get("auth.clientId"),
            connectionName: configuration.get("auth.connectionName"),
            redirectUri: configuration.get("auth.redirectUri"),
            signupUrl: configuration.get("signupUrl"),
            logoutRedirect: configuration.get("logoutRedirect"),
            loginRoute: configuration.get("loginRoute"),
            loginRedirect: configuration.get("loginRedirect"),
        }
    }

    register(model) {
        const postData = Object.assign({}, model, {
            client_id: this.config.clientId,
            connection: this.config.connectionName,
        })
        return this.httpClient.fetch(this.config.signupUrl, {
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
        return Promise.resolve().then(() => {
            window.location.replace(this.config.loginRedirect)
        })
    }

    logout() {
        localStorage.removeItem("access_token")
        localStorage.removeItem("expires_in")
        localStorage.removeItem("token_type")
        localStorage.removeItem("id_token")
        return Promise.resolve().then(() => {
            window.location.replace(this.config.logoutRedirect)
        })
    }
}
