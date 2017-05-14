import {HttpClient} from 'aurelia-fetch-client';

export class OrganizationService {

  static inject() {
    return [
      HttpClient
    ]
  };

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getAll() {
      return this.httpClient.fetch('/organizations')
        .then(response => response.json());
  }

  getById(id) {
    return this.httpClient.fetch('/organizations/' + id)
      .then(response => response.json());
  }
}
