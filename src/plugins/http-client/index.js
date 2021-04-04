import { AureliaConfiguration } from "aurelia-configuration";
import { HttpClient } from "aurelia-fetch-client";
import { Authentication } from "../../common/authentication";

export function configure(aurelia) {
    const instance = aurelia.container.get(AureliaConfiguration);
    const authentication = aurelia.container.get(Authentication);
    const http = new HttpClient();
    http.configure((conf) => {
        conf.useStandardConfiguration()
            .withBaseUrl(instance.get("apiBaseUrl"))
            .withInterceptor({
                request(request) {
                    if (authentication.isAuthenticated) {
                        const accessToken = authentication.accessToken;
                        request.headers.append(
                            "Authorization",
                            `Bearer ${accessToken}`
                        );
                    }
                    return request;
                },
            });
    });
    aurelia.container.registerInstance(HttpClient, http);
}
