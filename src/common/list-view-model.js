export class ListViewModel {
    constructor(activationStrategy, apiService) {
        this.activationStrategy = activationStrategy
        this.apiService = apiService
    }

    async activate(params) {
        if (params && params.page) {
            this.currentPage = +params.page
        } else {
            this.currentPage = 1
        }
        const offset = (this.currentPage - 1) * 10
        return this.getResources(10, offset)
    }

    determineActivationStrategy() {
        return this.activationStrategy.invokeLifecycle
    }

    getResources(limit, offset) {
        return this.apiService.getAll(limit, offset)
            .then((response) => {
                this.totalSize = response.totalSize
                this.currentPage = Math.ceil(offset / limit) + 1
                this.lastPage = Math.ceil(this.totalSize / limit)
                return response.content
            })
    }
}
