import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import {MockedOrganizationService} from './mocks/organization-service';
import {MockedOrganizationOfficeService} from './mocks/organization-office-service';
import {MockedTimesheetEntryService} from './mocks/timesheet-entry-service';
import {OrganizationService} from './services/organization-service';
import {OfficeService} from './services/office-service';
import {TimesheetEntryService} from './services/timesheet-entry-service';

import configuration from 'config';

// comment out if you don't want a Promise polyfill (remove also from webpack.common.js)
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

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
  let orgSvcMock = new MockedOrganizationService();
  container.registerInstance(OrganizationService, orgSvcMock);
  let orgOfficeSvcMock = new MockedOrganizationOfficeService();
  container.registerInstance(OrganizationOfficeService, orgOfficeSvcMock);
  let timesheetEntrySvcMock = new MockedTimesheetEntryService(orgOfficeSvcMock);
  container.registerInstance(TimesheetEntryService, timesheetEntrySvcMock);
}
