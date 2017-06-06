import {inject, Factory} from 'aurelia-framework';
import {ApiService} from '../services/api-service';

@inject(ApiService)
export class New {

  constructor(apiService) {
    this.orgService = apiService('organizations');
  }

  create() {
    this.orgService.create({
      name: this.name,
    });
  }
}
