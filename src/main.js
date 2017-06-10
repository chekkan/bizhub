import {AuthService} from 'aurelia-authentication';
import {HttpClient} from 'aurelia-fetch-client';
import 'babel-polyfill';
import { PLATFORM } from 'aurelia-pal';
// import configuration from 'config';

// comment out if you don't want a Promise polyfill (remove also from webpack.common.js)
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    // .plugin('aurelia-google-analytics', config => {
    //     config.init(configuration.googleAnalytics.trackingId);
    //     config.attach(configuration.googleAnalytics.config);
    // })
    .feature(PLATFORM.moduleName('resources/index'));

    // if (configuration.debug) {
        aurelia.use.developmentLogging();
    // }

    // if (configuration.testing) {
        //aurelia.use.plugin('aurelia-testing');
    // }

    configureContainer(aurelia.container);

    await aurelia.start();
    await aurelia.setRoot(PLATFORM.moduleName('app'));
}

function configureContainer(container) {
  let http = new HttpClient();
  http.configure(conf => {
    conf
      .useStandardConfiguration()
      .withBaseUrl("http://localhost:3000")
      .withInterceptor({
        request(request) {
          let authService = container.get(AuthService);
          let accessToken = authService.getAccessToken();
          if (accessToken === undefined) {
            return request;
          }
          let authHeader = 'Bearer ' + accessToken;
          request.headers.append('Authorization', authHeader);
          return request;
        }
      });
  });
  container.registerInstance(HttpClient, http);
}
