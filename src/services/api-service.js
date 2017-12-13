import { inject, LogManager } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"

@inject(HttpClient)
export class ApiService {
    constructor(httpClient, resource) {
        const plural = {
            organization: "organizations",
            office: "offices",
            "time-entry": "time-entries",
            invoice: "invoices",
            "me/organizations": "me/organizations",
        }
        this.httpClient = httpClient
        this.resource = resource
        this.resourcesHref = `/${plural[resource]}`
        this.logger = LogManager.getLogger(`ApiService - ${resource}`)
    }

    parseFilter(filters) {
        const parts = Object.keys(filters).map((k) => {
            let value = filters[k]
            if (Array.isArray(value)) {
                value = value.join(",")
            }
            return `filter[${k}]=${value}`
        })
        return parts.join("&")
    }

    getAll(limit = 10, offset = 0, filters = null) {
        const params = { limit, offset }
        const urlParams = new URLSearchParams(Object.entries(params))
        let href = `${this.resourcesHref}?${urlParams}`
        if (filters) {
            const filterQuery = this.parseFilter(filters)
            href += `&${filterQuery}`
        }
        return this.httpClient.fetch(href)
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
            .then(res => res.headers.get("location"))
            .catch(error => error.json().then(err => Promise.reject(err)))
    }

    delete(id) {
        return this.httpClient.fetch(`${this.resourcesHref}/${id}`, {
            method: "delete",
        })
    }
}
