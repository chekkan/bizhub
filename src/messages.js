export class TimesheetEntryCreated {
    constructor(entry) {
        this.entry = entry;
    }
}

export class TimesheetEntryDeleted {
  constructor(entry) {
    this.entry = entry;
  }
}
