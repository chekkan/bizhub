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
        ratePerHour: 8.5,
        employer_office: {
            id: 1,
            address_line_1: '2 Simple Street',
            town_or_city: 'Bolton',
            organization: {
                id: 1,
                name: 'Hitachi Consulting'
            }
        }
    }
]

import {OrganizationOfficeService} from './organization-office-service';

export class TimesheetEntryService {
    static inject() { return [OrganizationOfficeService] };

    constructor(orgOfficeService) {
        this.orgOfficeService = orgOfficeService;
    }
    getAll() {
        return new Promise(resolve => {
            setTimeout(() => {
                let results = timesheetEntries.map(x =>  { 
                    return {
                        id:x.id,
                        start: new Date(x.start),
                        end: x.end,
                        break: x.break,
                        ratePerHour: x.ratePerHour,
                        employerOffice: {
                            id: x.employer_office.id,
                            addressLine1: x.employer_office.address_line_1,
                            townOrCity: x.employer_office.town_or_city,
                            organization: x.employer_office.organization
                        }
                    }
                });
                resolve(results);
            }, latency);
        });
    }

    create(timesheetEntry) {
        return new Promise(resolve => {
        setTimeout(() => {
            let instance = JSON.parse(JSON.stringify(timesheetEntry));
            let found = timesheetEntries.filter(x => x.id == timesheetEntry.id)[0];

            if(found){
                reject(new Error('already exist'));
            } else {
                instance.id = getId();
                this.orgOfficeService.getById(instance.employerOffice.id).then((o) => {
                    instance.employer_office = {
                        id: o.id,
                        address_line_1: o.addressLine1,
                        town_or_city: o.townOrCity,
                        organization: o.organization
                    };
                    timesheetEntries.push(instance);  
                    resolve(instance);                                      
                });
            }
        }, latency);
        });
    }
}
