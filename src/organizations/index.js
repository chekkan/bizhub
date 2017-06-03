import {inject} from 'aurelia-framework';
import {OrganizationService} from '../services/organization-service';

@inject(OrganizationService)
export class Index {

  constructor(organizationService) {
    this.organizationService = organizationService;
    this.organizations = [];

    this.getOrganizations();
  }

  getOrganizations() {
    this.organizationService.getAll()
    .then((orgs) => {
        this.totalSize = orgs.totalSize;
        this.organizations = orgs.content;
    })
  }

}
