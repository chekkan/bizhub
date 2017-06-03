import {inject} from 'aurelia-framework';
import {OrganizationService} from '../services/organization-service';

@inject(OrganizationService)
export class New {

  constructor(orgService) {
    this.orgService = orgService;
  }

  create() {
    this.orgService.create({
      name: this.name,
    });
  }
}
