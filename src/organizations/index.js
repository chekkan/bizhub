import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {activationStrategy} from 'aurelia-router';
import {OrganizationService} from '../services/organization-service';

@inject(Router, OrganizationService)
export class Index {

    currentPage = 1;
    lastPage = 1; 
    organizations = [];
    totalSize = 0;

    constructor(router, organizationService) {
        this.router = router;
        this.organizationService = organizationService;
    }

    activate(params) {
        if(params.page) {
            this.currentPage = +params.page;
        }
        const offset = (this.currentPage - 1) * 10;
        return this.getOrganizations(10, offset);
    }

    determineActivationStrategy() {
        return activationStrategy.invokeLifecycle;
    }

    getOrganizations(limit, offset) {
        this.organizationService.getAll(limit, offset)
        .then((orgs) => {
            this.totalSize = orgs.totalSize;
            this.currentPage = Math.ceil(offset / limit) + 1;
            this.lastPage = Math.ceil(this.totalSize / limit);
            this.organizations = orgs.content;
        });
    }
}
