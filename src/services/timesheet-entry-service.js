let latency = 200;
let id = 0;

function getId(){
  return ++id;
}

let timesheetEntries = [
    {
        id: getId(),
        start: '2016-05-29T14:25:00.000Z',
        end: '2016-05-29T20:30:00.000Z',
        break: 1,
        ratePerHour: 8.5
    }
]

export class TimesheetEntryService {
    getAll() {
        return new Promise(resolve => {
            setTimeout(() => {
                let results = timesheetEntries.map(x =>  { return {
                    id:x.id,
                    start: x.start,
                    end: x.end,
                    break: x.break,
                    ratePerHour: x.ratePerHour
                }});
                resolve(results);
            }, latency);
        });
    }

    create(timesheetEntry) {
        this.isRequesting = true;
        return new Promise(resolve => {
        setTimeout(() => {
            let instance = JSON.parse(JSON.stringify(timesheetEntry));
            let found = timesheetEntries.filter(x => x.id == timesheetEntry.id)[0];

            if(found){
                reject(new Error('already exist'));
            } else {
                instance.id = getId();
                timesheetEntries.push(instance);
            }

            this.isRequesting = false;
            resolve(instance);
        }, latency);
        });
    }
}
