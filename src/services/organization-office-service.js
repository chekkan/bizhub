import {HttpClient} from 'aurelia-fetch-client';

export class OrganizationOfficeService {

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
            .fetch('/organizations/'+orgId+'/offices')
            .then(response => response.json())
            .then(data => {
                if(data.length < 1) {
                    return data;
                }
                return data.map(x => this.transformData(x));
            });
    }


    getById(id) {
        return this.httpClient.fetch('/organizations/'+id)
            .then(response => response.json())
            .then(data => this.transformData(data));
    }

    transformData(data) {
        return {
            id: data.id,
            addressLine1: data.address_line_1,
            addressLine2: data.addressLine2,
            townOrCity: data.town_or_city,
            country: data.country,
            postcode: data.postcode,
            organization: {
              id: data.organization.id,
              name: data.organization.name
            }
        }
    }
}
