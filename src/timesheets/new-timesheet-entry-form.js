import {inject, Factor} from 'aurelia-framework';
import {ApiService} from './../services/api-service';
import {OfficeService} from './../services/office-service';
import {TimesheetEntryService} from './../services/timesheet-entry-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TimesheetEntryCreated} from './../messages'

@inject(Factory.of(ApiService), OfficeService, TimesheetEntryService, EventAggregator)
export class NewTimesheetEntryForm {

    constructor(apiService, officeService, timesheetEntryService, ea){
        this.orgService = apiService('organizations');
        this.officeService = officeService;
        this.timesheetEntryService = timesheetEntryService;
        this.ea = ea;

        this.employers = [];
        this.offices = [];
        this.employer = {};
        this.office = {};
        this.startTime = this.getRecommendedStarTime();
        this.endTime = new Date(this.startTime.getTime() + 8 * 60 * 60 * 1000); // yesterday + 8 hours
        this.break = 1;
        this.ratePerHour = 8;
        this.orgService.getAll().then(employers => {
            this.employers = employers;
            if (employers.length > 0) {
                this.selectEmployer(this.employers[0]);
            }
        });
    }

    selectEmployer(employer) {
        this.employer = employer;
        this.officeService.getByOrganizationId(employer.id).then(offices => {
            this.offices = offices;
            if (this.offices.length > 0) {
                this.office = this.offices[0];
            }
        });
    }

    save() {
        this.timesheetEntryService.create({
            start: this.startTime,
            end: this.endTime,
            break: this.break,
            ratePerHour: this.ratePerHour,
            employerOffice: {
                id: this.office.id
            }
        }).then((entry) => {
            this.ea.publish(new TimesheetEntryCreated(entry));
        });
    }

    getRecommendedStarTime() {
        var now = new Date();
        var morning = new Date(now.getFullYear(), now.getMonth(), now.getDate(),
          9, 0, 0, 0);
        return new Date(morning - 24 * 60 * 60 * 1000);
    }
}
