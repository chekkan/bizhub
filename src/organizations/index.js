import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {activationStrategy} from 'aurelia-router';
import {OrganizationService} from '../services/organization-service';

@inject(Router, OrganizationService)
export class Index {

    constructor(router, organizationService) {
        this.router = router;
        this.organizationService = organizationService;
        this.organizations = [];
        this.currentPage = 1;
        this.lastPage = 1;
    }

    activate(params) {
        console.log(params);
        const offset = (+params.page - 1) * 10;
        console.log(offset);
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

    changePage(page) {
        this.router.navigateToRoute(this.router.currentInstruction.config.name, { page: page });
    }

    nextPage() {
        this.router.navigateToRoute(this.router.currentInstruction.config.name, { page: this.currentPage + 1 });
    }

    previousPage() {
        this.router.navigateToRoute(this.router.currentInstruction.config.name, { page: this.currentPage - 1 });
    }
}
