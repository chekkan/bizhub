import { inject, Factory } from "aurelia-framework"
import { activationStrategy } from "aurelia-router"
import { ApiService } from "../services/api-service"
import { ListViewModel } from "../common/list-view-model"

@inject(activationStrategy, Factory.of(ApiService))
export class OrganizationsListViewModel extends ListViewModel {
    organizations = [];

    constructor(actStrategy, apiService) {
        super(actStrategy, apiService("organization"))
    }

    async activate(params) {
        return super.activate(params)
            .then((resources) => {
                this.organizations = resources
            })
    }
}
