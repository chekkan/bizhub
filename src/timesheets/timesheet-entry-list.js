import {TimesheetEntryService} from '../services/timesheet-entry-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TimesheetEntryCreated} from './../messages';
import {bindable} from 'aurelia-framework';

export class TimesheetEntryList {
    static inject() { return [
      TimesheetEntryService,
      EventAggregator
    ] };

    // TODO: is there a static way to do this?
    @bindable selectedItems;

    constructor(timesheetEntryService, ea) {
        this.timesheetEntryService = timesheetEntryService;
        this.timesheetEntries = [];

        ea.subscribe(TimesheetEntryCreated, msg => {
            this.populateTimesheetEntries();
        });

        this.populateTimesheetEntries();
    }

    populateTimesheetEntries() {
        this.timesheetEntryService.getAll().then((entries) => {
            this.timesheetEntries = entries.map((entry) => {
                var hours = entry.start.getHours() < 10
                    ? "0"+entry.start.getHours()
                    : entry.start.getHours();
                var minutes = entry.start.getMinutes() < 10
                    ? "0"+entry.start.getMinutes()
                    : entry.start.getMinutes();
                return {
                    id: entry.id,
                    date: entry.start,
                    time: hours + ':' + minutes,
                    hours: 8,
                    ratePerHour: entry.ratePerHour,
                    break: entry.break,
                    employerOffice: entry.employerOffice
                };
            });
        });
    }

    printSelectedItems() {
      console.log(this.selectedItems);
      return true;
    }
}
