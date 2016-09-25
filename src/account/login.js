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

    login() {
        return this.authService.login({
            username: this.email,
            password: this.password,
            grant_type: 'password'
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
                console.log('success logged ' + response);
        }).catch(err => {
                console.log('login failure');
        });
    }

}
