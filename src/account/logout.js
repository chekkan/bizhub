import {AuthService} from 'aurelia-authentication';

export class Logout {

    static inject() {
        return [
            AuthService
        ];
    }

    constructor(authService) {
        this.authService = authService;
    }

    activate() {
        this.authService.logout();
    }
}
