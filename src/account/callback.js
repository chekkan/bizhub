import { inject } from "aurelia-framework";
import { AuthService } from "../services/auth-service";

@inject(AuthService)
export class SignInCallbackViewModel {
    constructor(authService) {
        let qs = SignInCallbackViewModel.parseQueryString(
            window.location.search.substr(1)
        );
        if (qs.action && qs.action === "logout") {
            authService.logout();
        } else {
            qs = SignInCallbackViewModel.parseQueryString(
                window.location.hash.substr(1)
            );
            authService.login(qs);
        }
    }

    static parseQueryString(value) {
        return value
            .split("&")
            .map((r) => {
                const pair = r.split("=");
                return {
                    [pair[0]]: pair[1],
                };
            })
            .reduce((result, item) => {
                const key = Object.keys(item)[0];
                return Object.assign({}, result, {
                    [key]: item[key],
                });
            }, {});
    }
}
