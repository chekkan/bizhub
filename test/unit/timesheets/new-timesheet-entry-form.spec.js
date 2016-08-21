import {NewTimesheetEntryForm} from '../../../src/timesheets/new-timesheet-entry-form';

class OrgServiceMock {
    getAll(){
        var response = this.itemStub;
        return new Promise((resolve) => {
            resolve(({json: response}));
        });
    }
}

describe('the NewTimesheetEntryForm module', () => {
    var sut;
    var now;
    var yesterday;

    beforeEach(() => {
        sut = new NewTimesheetEntryForm(new OrgServiceMock());
        now = new Date();
        yesterday = new Date(now - 24 * 60 * 60 * 1000)
    });

    it('startTime is yesterday at 9am when there are no timesheet history', () => {
        expect(sut.startTime.getFullYear()).toEqual(yesterday.getFullYear());
        expect(sut.startTime.getMonth()).toEqual(yesterday.getMonth());
        expect(sut.startTime.getDate()).toEqual(yesterday.getDate());
        expect(sut.startTime.getHours()).toEqual(9);
        expect(sut.startTime.getMinutes()).toEqual(0);
    });

    it('endTime is 8 hours after startTime when there are no timesheet history',
      () => {
        expect(sut.endTime).toEqual(
          new Date(sut.startTime.getTime() + 8 * 60 * 60 * 1000));
    });
});
