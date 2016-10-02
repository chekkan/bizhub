import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import {AuthService} from 'aurelia-authentication';
import {HttpClient} from 'aurelia-fetch-client';
import configuration from 'config';

// comment out if you don't want a Promise polyfill (remove also from webpack.common.js)
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    // .plugin('aurelia-configuration', config => {
    //     config.setEnvironments({
    //         development: ['localhost'],
    //         production: ['bizhub.io']
    //     });
    // })
    .plugin('aurelia-authentication', baseConfig => {
        baseConfig.configure(configuration);
    })
    .feature('resources');

    // let configInstance = aurelia.container.get(Configure);

    if (configuration.debug) {
        aurelia.use.developmentLogging();
    }

    if (configuration.testing) {
        //aurelia.use.plugin('aurelia-testing');
    }

    configureContainer(aurelia.container);

    await aurelia.start();
    aurelia.setRoot();
}

function configureContainer(container) {
  let http = new HttpClient();
  http.configure(conf => {
    conf
      .useStandardConfiguration()
      .withBaseUrl(configuration.apiBaseUrl)
      .withInterceptor({
          request(request) {
            let authService = container.get(AuthService);
            let accessToken = authService.getAccessToken();
            if(accessToken === undefined) {
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
