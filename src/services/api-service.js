import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class ApiService {

    constructor(httpClient, resource) {
        this.httpClient = httpClient;
        this.resourceHref = '/' + resource;
    }

    getAll(limit = 10, offset = 0) {
        const params = { limit, offset };
        const urlParams = new URLSearchParams(Object.entries(params));
        return this.httpClient.fetch(this.resourceHref + '?' + urlParams)
        .then(response => response.json());
    }

    getById(id) {
        return this.httpClient.fetch(this.resourceHref + '/' + id)
        .then(response => response.json());
    }

    create(organization) {
        return this.httpClient.fetch(this.resourceHref, {
            method: 'post',
            body: json(organization)
        })
        .then(response => {
            console.log(response);
        });
    }

    delete(id) {
        return this.httpClient.fetch(this.resourceHref + '/' + id, {
            method: 'delete'
        });
    }
}
