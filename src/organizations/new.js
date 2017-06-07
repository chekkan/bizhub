import {inject, Factory} from 'aurelia-framework';
import {ApiService} from '../services/api-service';

@inject(Factory.of(ApiService))
export class New {

  constructor(apiService) {
    this.orgService = apiService('organization');
  }

  create() {
    this.orgService.create({
      name: this.name,
    });
  }
}
