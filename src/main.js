import { HttpClient } from "aurelia-fetch-client"
import "babel-polyfill"
import { PLATFORM } from "aurelia-pal"
import * as Bluebird from "bluebird"
// import configuration from 'config';

Bluebird.config({ warnings: false })

function configureContainer(container) {
    const http = new HttpClient()
    http.configure((conf) => {
        conf
        .useStandardConfiguration()
        .withBaseUrl("http://localhost:3000")
    })
    container.registerInstance(HttpClient, http)
}

export async function configure(aurelia) { // eslint-disable-line import/prefer-default-export
    aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName("aurelia-validation"))
    .feature(PLATFORM.moduleName("resources/index"))
    .developmentLogging()

    configureContainer(aurelia.container)

    await aurelia.start()
    await aurelia.setRoot(PLATFORM.moduleName("app"))
}
