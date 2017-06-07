import {inject, Factory} from 'aurelia-framework';
import {ApiService} from '../services/api-service';

@inject(Factory.of(ApiService))
export class Detail {

  constructor(apiService) {
    this.organizationService = apiService('organization');
    this.organization = {};
  }

  activate(params) {
    return this.organizationService.getById(params.id)
    .then((org) => {
      this.organization = org;
    });
  }

  delete() {
      this.organizationService.delete(this.organization.id)
      .then(() => this.router.navigateToRoute('organizations'));
  }
}
