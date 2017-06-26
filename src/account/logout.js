export class LogoutViewModel {
    constructor() {
        let href = "https://bizhub.eu.auth0.com/v2/logout"
        href += "?client_id=FADvfi3XwGOe5NLT7zDXjthJ3WgwPIQU"
        href += "&returnTo=http://localhost:8080/callback?action=logout"
        window.location.replace(href)
    }
}
