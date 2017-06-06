import {inject} from 'aurelia-framework';
import {OrganizationService} from '../services/organization-service';

@inject(OrganizationService)
export class Detail {

  constructor(organizationService) {
    this.organizationService = organizationService;
    this.organization = {};
  }

  activate(params) {
    return this.organizationService.getById(params.id)
    .then((org) => {
      this.organization = org;
    });
  }

  delete() {
      this.organizationService.delete(this.organization._id)
      .then(() => this.router.navigateToRoute('organizations'));
  }
}
