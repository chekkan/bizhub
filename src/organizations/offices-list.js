import {inject, bindable} from 'aurelia-framework';
import {OfficeService} from '../services/office-service';

@inject(OfficeService)
export class OfficesList {

  @bindable organizationId;

  constructor(officeService) {
    this.officeService = officeService;
    this.offices = [];
  }

  organizationIdChanged() {
    return this.officeService.getByOrganizationId(this.organizationId)
    .then((offices) => {
      this.offices = offices;
    });
  }

}
