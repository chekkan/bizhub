import { HttpClient } from "aurelia-fetch-client"
import "babel-polyfill"
import { PLATFORM } from "aurelia-pal"
import * as Bluebird from "bluebird"
import configuration from "config" // eslint-disable-line import/no-unresolved,import/extensions,import/no-extraneous-dependencies

Bluebird.config({ warnings: false })

function configureContainer(container) {
    const http = new HttpClient()
    http.configure((conf) => {
        conf
        .useStandardConfiguration()
        .withBaseUrl(configuration.apiBaseUrl)
    })
    container.registerInstance(HttpClient, http)
}

export async function configure(aurelia) {
    aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName("aurelia-validation"))
    .plugin(PLATFORM.moduleName("aurelia-google-analytics"), (config) => {
        config.init(configuration.googleAnalytics.trackingId)
        config.attach(configuration.googleAnalytics.config)
    })
    .feature(PLATFORM.moduleName("resources/index"))
    .developmentLogging()

    configureContainer(aurelia.container)

    await aurelia.start()
    await aurelia.setRoot(PLATFORM.moduleName("app"))
}
