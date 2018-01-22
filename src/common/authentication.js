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

        const currentTime = Date.now() / 1000
        const isExpired = jwt.exp < currentTime
        if (isExpired) {
            return false
        }
        return jwt.nonce === nonce
    }

    get accessToken() {
        return localStorage.getItem("access_token")
    }

    get userId() {
        return "108400419258399939747"
    }
}
