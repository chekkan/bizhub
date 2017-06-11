import { inject, Factory } from "aurelia-framework"
import { ApiService } from "../services/api-service"
import schema from "./office-schema"

@inject(Factory.of(ApiService))
export default class New {

    constructor(apiService) {
        this.officeService = apiService("office")
        this.schema = schema
        this.model = {}
    }

    create() {
        this.officeService.create(this.model)
    }
}
