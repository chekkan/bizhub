import {bindable} from 'aurelia-framework';

export class PaginationCustomElement {
    @bindable() router;
    @bindable() currentPage;
    @bindable() lastPage;

    changePage(page) {
        this.router.navigateToRoute(this.router.currentInstruction.config.name, {page: page});
    }

    nextPage() {
        this.router.navigateToRoute(this.router.currentInstruction.config.name, {page: this.currentPage + 1});
    }

    previousPage() {
        this.router.navigateToRoute(this.router.currentInstruction.config.name, {page: this.currentPage - 1});
    }
}
