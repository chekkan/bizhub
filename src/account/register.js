import {Router} from 'aurelia-router';
import {AccountService} from '../services/account-service'

export class Register {

    static inject() {
      return [
        AccountService,
        Router
      ]
    };

    constructor(accountService, router) {
        this.accountService = accountService;
        this.router = router;
    };

    register() {
        var self = this;
        this.accountService.create({
            email: this.email,
            password: this.password,
            givenName: this.firstName,
            surname: this.lastName
        }).then(function(){
            self.router.navigateToRoute('login');
        });
    }
}
