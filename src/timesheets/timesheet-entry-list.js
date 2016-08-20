import {TimesheetEntryService} from '../services/timesheet-entry-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TimesheetEntryCreated} from './../messages';

export class TimesheetEntryList {
    static inject() { return [TimesheetEntryService, EventAggregator] };
    
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
            this.timesheetEntries = entries;
        });
    }
}