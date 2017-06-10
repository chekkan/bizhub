import { EventAggregator } from "aurelia-event-aggregator"
import { TimesheetEntryService } from "./../services/timesheet-entry-service"
import { TimesheetEntryDeleted } from "./../messages"

export class Index {

    static inject() {
        return [
            TimesheetEntryService,
            EventAggregator,
        ]
    }

    constructor(timesheetEntryService, ea) {
        this.timesheetEntryService = timesheetEntryService
        this.ea = ea

        this.addFormEnabled = false
        this.selectedItems = []
    }

    toggleAddForm() {
        this.addFormEnabled = !this.addFormEnabled
    }

    deleteSelectedItems() {
        this.selectedItems.forEach((item) => {
            const self = this
            this.timesheetEntryService.delete(item.id).then(() => {
                self.ea.publish(new TimesheetEntryDeleted(item))
            })
        })
    }
}
