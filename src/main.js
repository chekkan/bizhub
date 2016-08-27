import environment from './environment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import {HttpClient} from 'aurelia-fetch-client';
var config = require('config');

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
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
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
      .withBaseUrl(config.apiBaseUrl);
  });
  container.registerInstance(HttpClient, http);
}
