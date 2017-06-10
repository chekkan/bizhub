import { HttpClient, json } from "aurelia-fetch-client"

export class AccountService {

    static inject() {
        return [
            HttpClient,
        ]
    }

    constructor(httpClient) {
        this.httpClient = httpClient
    }

    create(account) {
        return this.httpClient.fetch("/register", {
            method: "post",
            body: json(account),
            headers: {
                Accept: "application/json",
            },
        })
      .then(response => response.json())
    }
}
