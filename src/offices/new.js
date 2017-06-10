import { inject, Factory } from "aurelia-framework"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService))
export default class New {

    constructor(apiService) {
        this.officeService = apiService("offices")
        this.schema = {
            properties: {
                addressLine1: {
                    type: "string",
                    title: "Address Line 1",
                },
                addressLine2: {
                    type: "string",
                    title: "Address Line 2",
                },
                townOrCity: {
                    type: "string",
                    title: "Town or City",
                },
                county: {
                    type: "string",
                    title: "County",
                },
                country: {
                    type: "string",
                    title: "Country",
                },
                postalCode: {
                    type: "string",
                    title: "Postal Code",
                },
            },
        }
        this.model = {}
    }

    create() {
        this.officeService.create(this.model)
    }
}
