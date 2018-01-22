import { inject } from "aurelia-framework"
import { Router } from "aurelia-router"
import { HttpClient } from "aurelia-fetch-client"
import { AureliaConfiguration } from "aurelia-configuration"
import { Authentication } from "../common/authentication"

@inject(HttpClient, AureliaConfiguration, Router, Authentication)
export class AuthService {
    constructor(httpClient, configuration, router, authentication) {
        this.httpClient = httpClient
        this.router = router
        this.authentication = authentication
        this.config = {
            authEndpoint: configuration.get("auth.authEndpoint"),
            clientId: configuration.get("auth.clientId"),
            connectionName: configuration.get("auth.connectionName"),
            redirectUri: configuration.get("auth.redirectUri"),
            signupUrl: configuration.get("auth.signupUrl"),
            logoutUrl: configuration.get("auth.logoutUrl"),
            audience: configuration.get("auth.audience"),
            logoutRedirect: configuration.get("logoutRedirect"),
            loginRoute: configuration.get("loginRoute"),
            loginRedirect: configuration.get("loginRedirect"),
        }
    }

    get isAuthenticated() {
        return this.authentication.isAuthenticated
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

    generateNonce(length = 16) {
        const bytes = new Uint8Array(length)
        const random = window.crypto.getRandomValues(bytes)
        const result = []
        const charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~"
        random.forEach((c) => {
            result.push(charset[c % charset.length])
        })
        return result.join("")
    }

    saveNonce(nonce) {
        localStorage.setItem("nonce", nonce)
    }
}
