import {HttpClient} from 'aurelia-fetch-client';

export class OfficeService {

  static inject() {
    return [
      HttpClient
    ];
  }

  constructor(httpClient) {
      this.httpClient = httpClient;
  }

  getByOrganizationId(orgId) {
    return this.httpClient
      .fetch('/offices?filter[organization][id]='+orgId)
      .then(response => response.json())
      .then(data => {
        if(data.length < 1) {
          return data;
        }
        return data.map(x => this.transformData(x));
      });
  }


  getById(id) {
    return this.httpClient.fetch('/offices/'+id)
      .then(response => response.json())
      .then(data => this.transformData(data));
  }

  transformData(data) {
    return {
      id: data.id,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      townOrCity: data.townOrCity,
      country: data.country,
      postcode: data.postcode,
      organization: {
        id: data.organization.id,
        name: data.organization.name
      }
    }
  }
}
