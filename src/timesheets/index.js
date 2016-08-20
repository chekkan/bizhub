import {TimesheetEntryService} from '../services/timesheet-entry-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TimesheetEntryCreated} from './../messages';

export class Index {

    static inject() { return [TimesheetEntryService, EventAggregator] };
    
    constructor(timesheetEntryService, ea) {
        this.timesheetEntryService = timesheetEntryService;
        this.timesheetEntries = [];
        
        ea.subscribe(TimesheetEntryCreated, msg => {
            console.log('timesheet created event received');
            this.timesheetEntryService.getAll().then((entries) => {
                this.timesheetEntries = entries;
            });
        });
    }

    activate() {
        this.timesheetEntryService.getAll().then((entries) => {
            this.timesheetEntries = entries;
        })
    }
}