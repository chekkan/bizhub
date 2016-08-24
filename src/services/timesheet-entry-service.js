import {HttpClient, json} from 'aurelia-fetch-client';
import {OrganizationOfficeService} from './organization-office-service';

export class TimesheetEntryService {
    static inject() { return [OrganizationOfficeService, HttpClient] };

    constructor(orgOfficeService, httpClient) {
        this.orgOfficeService = orgOfficeService;
        this.httpClient = httpClient;
    }

    getAll() {
        return this.httpClient.fetch('/timesheet-entries')
            .then(response => response.json())
            .then(data => {
                if (data.length < 1) {
                    return data;
                }
                return data.map(x => this.transformData(x));
            });
    }

    create(timesheetEntry) {
        console.log(timesheetEntry);
        return this.httpClient.fetch('/timesheet-entries', {
            method: 'post',
            body: json(timesheetEntry)
        })
        .then(response => response.json())
        .then(data => this.transformData(data));
    }

    delete(id) {
      return new Promise(resolve => {
        setTimeout(() => {
          let index = timesheetEntries.map((x) => x.id).indexOf(id);

          if (index < 0) {
            reject(new Error('not found'));
          } else {
            timesheetEntries.splice(index, 1);
            resolve();
          }
        });
      });
    }

    transformData(data) {
        return {
            id:data.id,
            start: new Date(data.start),
            end: data.end,
            break: data.break,
            ratePerHour: data.ratePerHour,
            employerOffice: {
                id: data.employerOffice.id,
                addressLine1: data.employerOffice.addressLine1,
                townOrCity: data.employerOffice.townOrCity,
                organization: data.employerOffice.organization
            }
        }
    }
}
