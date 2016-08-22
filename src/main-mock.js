import environment from './environment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import {MockedOrganizationService} from './mocks/organization-service';
import {OrganizationService} from './services/organization-service';

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
  let orgSvcMock = new MockedOrganizationService();
  container.registerInstance(OrganizationService, orgSvcMock);
}
