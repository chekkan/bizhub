import { inject, Factory, LogManager } from "aurelia-framework"
import { Router } from "aurelia-router"
import moment from "moment"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService), Router)
export class NewInvoiceViewModel {
    timeEntries = []
    selectedEntries = []

    constructor(apiService, router) {
        this.logger = LogManager.getLogger("NewInvoiceViewModel")
        this.timeEntryService = apiService("time-entry")
        this.orgService = apiService("organization")
        this.officeService = apiService("office")
        this.invoiceService = apiService("invoice")
        this.date = new Date().toISOString().slice(0, 10)
        this.currentStep = "select-time-card"
        this.router = router
    }

    async activate() {
        const self = this
        return this.timeEntryService.getAll(10, 0)
        .then((response) => {
            const resources = response.content
            const orgIds = resources.map(resource => resource.organization.id)
                .filter((v, i, a) => a.indexOf(v) === i)
            const officeIds = resources.map(resource => resource.office.id)
                .filter((v, i, a) => a.indexOf(v) === i)

            const orgsPromise = this.orgService.getAll(orgIds.length, 0, { id: orgIds })
            const officesPromise = this.officeService.getAll(officeIds.length, 0, { id: officeIds })

            return Promise.all([orgsPromise, officesPromise])
            .then((values) => {
                const orgs = values[0].content
                const offices = values[1].content

                self.timeEntries = resources.map(resource => ({
                    id: resource.id,
                    start: resource.start,
                    end: resource.end,
                    break: moment.duration(resource.break, "minutes").humanize().replace("minute", "min"),
                    ratePerHour: resource.ratePerHour,
                    organization: orgs.filter(o => o.id === resource.organization.id)[0],
                    office: offices.filter(o => o.id === resource.office.id)[0],
                }))
            })
            .then(() => this.orgService.getAll(10, 0))
            .then((orgsResponse) => {
                this.organizations = orgsResponse.content
                return Promise.resolve(orgsResponse.content[0])
            })
            .then(currentOrg => this.orgService.getChild(currentOrg.id, "offices")
                .then(offices => offices.content))
            .then((offices) => {
                this.offices = offices
            })
        })
    }

    selectCard(entry) {
        const index = this.selectedEntries.indexOf(entry.id)
        if (index > -1) {
            this.selectedEntries.splice(index, 1)
            this.timeEntries.find(e => e.id === entry.id).selected = false
        } else {
            this.timeEntries.find(e => e.id === entry.id).selected = true
            this.selectedEntries.push(entry.id)
        }
    }

    orgIdChanged(newOrgId) {
        return this.orgService.getChild(newOrgId, "offices")
        .then(offices => offices.content)
        .then((offices) => {
            this.offices = offices
        })
    }

    nextStep() {
        this.currentStep = "info"
    }

    goToEditTimeCardsStep() {
        this.currentStep = "select-time-card"
    }

    createInvoice() {
        const newInvoice = {
            date: this.date,
            timeEntries: this.selectedEntries.map(e => ({ id: e })),
            recipient: {
                organization: { id: this.orgId },
                office: { id: this.officeId },
            },
        }
        this.logger.debug(newInvoice)
        this.invoiceService.create(newInvoice)
        .then((response) => {
            this.logger.debug(response)
            this.router.navigateToRoute("invoices")
        }).catch((err) => {
            this.logger.error(err)
        })
    }
}
