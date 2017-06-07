import {inject, bindable, Factory} from 'aurelia-framework';
import {ApiService} from '../services/api-service';

@inject(Factory.of(ApiService))
export class OfficesList {

  @bindable organizationId;

  constructor(apiService) {
    this.orgService = apiService('organization');
    this.offices = [];
  }

  organizationIdChanged() {
    return this.orgService.getChild(this.organizationId, 'offices')
    .then((data) => {
      this.offices = data.content;
    });
  }

}
