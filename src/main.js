import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import {AuthService} from 'aurelia-authentication';
import {HttpClient} from 'aurelia-fetch-client';
import config from 'config';

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-authentication', baseConfig => {
        baseConfig.configure(config);
    })
    .feature('resources');

  if (config.debug) {
    aurelia.use.developmentLogging();
  }

  if (config.testing) {
    //aurelia.use.plugin('aurelia-testing');
  }

  configureContainer(aurelia.container);

  aurelia.start().then(() => aurelia.setRoot());
}

function configureContainer(container) {
  let http = new HttpClient();
  http.configure(conf => {
    conf
      .useStandardConfiguration()
      .withBaseUrl(config.apiBaseUrl)
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
