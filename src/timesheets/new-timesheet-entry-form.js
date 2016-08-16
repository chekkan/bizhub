import {OrganizationService} from './../services/organization-service';
import {OrganizationOfficeService} from './../services/organization-office-service';

export class NewTimesheetEntryForm {
    static inject() { return [OrganizationService, OrganizationOfficeService] };

    constructor(orgService, orgOfficeServie){
        this.orgService = orgService;
        this.orgOfficeServie = orgOfficeServie;
        this.employers = [];
        this.offices = [];
        this.orgService.getAll().then(employers => {
            this.employers = employers;
            if (employers.length > 0) {
                this.selectEmployer(this.employers[0]);
            }
        });
    }

    selectEmployer(employer) {
        this.orgOfficeServie.getByOrganizationId(employer.id)
            .then(offices => this.offices = offices);
    }
}