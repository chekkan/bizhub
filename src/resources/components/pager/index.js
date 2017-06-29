import { bindable, inject } from "aurelia-framework"
import { Router } from "aurelia-router"

@inject(Router)
export class PagerCustomElement {
  @bindable()
    currentPage;
  @bindable()
    lastPage;

    constructor(router) {
        this.route = router.currentInstruction.config.name
    }

    get nextPage() {
        return this.currentPage + 1
    }

    get previousPage() {
        return this.currentPage - 1
    }
}
