import { AureliaConfiguration } from "aurelia-configuration"
import { HttpClient } from "aurelia-fetch-client"

export function configure(aurelia) {
    const instance = aurelia.container.get(AureliaConfiguration)
    const http = new HttpClient()
    http.configure((conf) => {
        conf
        .useStandardConfiguration()
        .withBaseUrl(instance.get("apiBaseUrl"))
    })
    aurelia.container.registerInstance(HttpClient, http)
}
