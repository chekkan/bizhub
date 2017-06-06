import {HttpClient, json} from 'aurelia-fetch-client';

export class OrganizationService {

    static inject() {
        return [
            HttpClient
        ]
    };

    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getAll(limit = 10, offset = 0) {
        const params = { limit, offset };
        const urlParams = new URLSearchParams(Object.entries(params));
        return this.httpClient.fetch('/organizations?' + urlParams)
        .then(response => response.json());
    }

    getById(id) {
        return this.httpClient.fetch('/organizations/' + id)
        .then(response => response.json());
    }

    create(organization) {
        return this.httpClient.fetch('/organizations', {
            method: 'post',
            body: json(organization)
        })
        .then(response => {
            console.log(response);
        });
    }

    delete(id) {
        return this.httpClient.fetch('/organizations/' + id, {
            method: 'delete'
        });
    }
}
