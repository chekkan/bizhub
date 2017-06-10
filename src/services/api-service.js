import { inject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"

@inject(HttpClient)
export class ApiService {

    constructor(httpClient, resource) {
        const plural = {
            organization: "organizations",
            office: "offices",
        }
        this.httpClient = httpClient
        this.resource = resource
        this.resourcesHref = `/${plural[resource]}`
    }

    getAll(limit = 10, offset = 0) {
        const params = { limit, offset }
        const urlParams = new URLSearchParams(Object.entries(params))
        return this.httpClient.fetch(`${this.resourcesHref}?${urlParams}`)
        .then(response => response.json())
    }

    getById(id) {
        return this.httpClient.fetch(`${this.resourcesHref}/${id}`)
        .then(response => response.json())
    }

    getChild(id, childResource) {
        const href = `/${childResource}?filter[${this.resource}][id]=${id}`
        return this.httpClient.fetch(href)
        .then(response => response.json())
    }

    create(organization) {
        return this.httpClient.fetch(this.resourcesHref, {
            method: "post",
            body: json(organization),
        })
    }

    delete(id) {
        return this.httpClient.fetch(`${this.resourcesHref}/${id}`, {
            method: "delete",
        })
    }
}
