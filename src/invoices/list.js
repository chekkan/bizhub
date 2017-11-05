import { inject, Factory, LogManager } from "aurelia-framework"
import { activationStrategy } from "aurelia-router"
import { ApiService } from "../services/api-service"
import { ListViewModel } from "../common/list-view-model"

@inject(activationStrategy, Factory.of(ApiService))
export class InvoicesListViewModel extends ListViewModel {
    invoices = []

    constructor(actStrategy, apiService) {
        super(actStrategy, apiService("invoice"))
        this.timeEntryService = apiService("time-entry")
        this.logger = LogManager.getLogger("InvoicesListViewModel")
    }

    async activate(params) {
        return super.activate(params)
        .then((invoices) => {
            const timeEntryIds = invoices.map(inv => inv.timeEntries.map(te => te.id))
                .reduce((acc, val) => [...acc, ...val])
                .filter((v, i, a) => a.indexOf(v) === i)
            return this.timeEntryService.getAll(timeEntryIds.length, 0, {
                id: timeEntryIds.map(te => te),
            })
            .then(teRes => teRes.content)
            .then(timeEntries => (invoices.map(inv => Object.assign({}, inv, {
                timeEntries: inv.timeEntries
                    .map(te => timeEntries.filter(entry => entry.id === te.id)[0]),
            }))))
        })
        .then((invoices) => {
            this.logger.debug(invoices)
            this.invoices = invoices.map(inv => ({
                id: inv.id,
                date: inv.date,
                totalAmount: inv.timeEntries.reduce((acc, val) => {
                    const msInHours = (1000 * 60 * 60)
                    const breakInHrs = val.break / 60
                    const workTimeInMs = new Date(val.end) - new Date(val.start)
                    const totalHours = (workTimeInMs / msInHours) - (breakInHrs)
                    return (acc + (totalHours * val.ratePerHour))
                }, 0),
            }))
            this.logger.debug(this.invoices)
        })
    }
}
