import { inject, Factory } from "aurelia-framework"
import { activationStrategy } from "aurelia-router"
import moment from "moment"
import { ApiService } from "../services/api-service"
import { ListViewModel } from "../common/list-view-model"

@inject(activationStrategy, Factory.of(ApiService))
export class TimeEntriesListViewModel extends ListViewModel {

    timeEntries = []

    constructor(actStrategy, apiService) {
        super(actStrategy, apiService("time-entry"))
    }

    async activate(params) {
        return super.activate(params)
        .then((resources) => {
            this.timeEntries = resources.map(resource => ({
                start: resource.start,
                hours: Math.abs(
                    Date.parse(resource.end) - Date.parse(resource.start),
                ) / 36e5,
                break: moment.duration(resource.break, "minutes").humanize(),
                ratePerHour: resource.ratePerHour,
            }))
        })
    }
}
