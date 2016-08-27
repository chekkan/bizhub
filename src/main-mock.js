import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import config from 'config';

import {MockedOrganizationService} from './mocks/organization-service';
import {MockedOrganizationOfficeService} from './mocks/organization-office-service';
import {MockedTimesheetEntryService} from './mocks/timesheet-entry-service';
import {OrganizationService} from './services/organization-service';
import {OrganizationOfficeService} from './services/organization-office-service';
import {TimesheetEntryService} from './services/timesheet-entry-service';

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
  let orgSvcMock = new MockedOrganizationService();
  container.registerInstance(OrganizationService, orgSvcMock);
  let orgOfficeSvcMock = new MockedOrganizationOfficeService();
  container.registerInstance(OrganizationOfficeService, orgOfficeSvcMock);
  let timesheetEntrySvcMock = new MockedTimesheetEntryService(orgOfficeSvcMock);
  container.registerInstance(TimesheetEntryService, timesheetEntrySvcMock);
}
