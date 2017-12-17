import { inject, Factory, bindable } from "aurelia-framework"
import { ApiService } from "../services/api-service"

@inject(Factory.of(ApiService))
export class MyOrgsListCustomElement {
    @bindable orgs = [];
}
