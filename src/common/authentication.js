export class Authentication {
    get isAuthenticated() {
        const idToken = localStorage.getItem("id_token")
        const nonce = localStorage.getItem("nonce")
        if (!idToken) {
            return false
        }
        let jwt
        try {
            const base64Url = idToken.split(".")[1]
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
            jwt = JSON.parse(window.atob(base64))
        } catch (error) {
            return false
        }

        if (jwt) {
            const isExpired = !(Math.round(new Date().getTime() / 1000) <= jwt.exp)
            if (isExpired) {
                return false
            }
            return jwt.nonce === nonce
        }

        return true
    }

    get accessToken() {
        return localStorage.getItem("access_token")
    }
}
