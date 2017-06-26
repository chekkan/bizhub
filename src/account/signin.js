export class SignInViewModel {
    constructor() {
        let href = "https://bizhub.eu.auth0.com/authorize"
        href += "?response_type=token&client_id=FADvfi3XwGOe5NLT7zDXjthJ3WgwPIQU"
        href += "&connection=Username-Password-Authentication"
        href += "&redirect_uri=http://localhost:8080/callback"
        window.location.replace(href)
    }
}
