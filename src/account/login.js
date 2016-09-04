import {AuthService} from 'aurelia-authentication';

export class Login {

    static inject() {
      return [
        AuthService
      ]
    };

    constructor(authService) {
        this.authService = authService;
    };

    authenticate(name) {
        return this.authService.authenticate(name)
        .then(() => {
            console.log("auth response " + this.authService.authenticated);
        });
    }

}
