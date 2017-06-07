import {HttpClient, json} from 'aurelia-fetch-client';

export class TimesheetEntryService {
    static inject() { return [HttpClient] };

    constructor(officeService, httpClient) {
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
        return this.httpClient.fetch('/timesheet-entries', {
            method: 'post',
            body: json(timesheetEntry)
        })
        .then(response => response.json())
        .then(data => this.transformData(data));
    }

    delete(id) {
        return this.httpClient.fetch('/timesheet-entries/'+id, {
            method: 'delete'
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
