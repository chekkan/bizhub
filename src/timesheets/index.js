import {TimesheetEntryService} from './../services/timesheet-entry-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TimesheetEntryDeleted} from './../messages';

export class Index {

  static inject() {
    return [
      TimesheetEntryService,
      EventAggregator
    ];
  }

  constructor(timesheetEntryService, ea) {
    this.timesheetEntryService = timesheetEntryService;
    this.ea = ea;

    this.addFormEnabled = false;
    this.selectedItems = [];
  }

  toggleAddForm() {
    this.addFormEnabled = !this.addFormEnabled;
  }

  deleteSelectedItems() {
    this.selectedItems.forEach((item) => {
      let self = this;
      this.timesheetEntryService.delete(item.id).then(function() {
        console.log('deleted item with id ' + item.id);
        self.ea.publish(new TimesheetEntryDeleted(item));
      });
    });
  }
}
